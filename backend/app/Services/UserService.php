<?php

namespace App\Services;

use App\Models\Interest;
use App\Models\Interestable;
use App\Models\User;
use App\Traits\FilesKit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use League\Csv\Writer;

class UserService extends Service
{

    use FilesKit;

    public function updateProfile($data)
    {
        if (isset($data['image']) and $data['image']) {
            $path = $this->storeFile($data['image'], 'images', true);
            $data['image'] = $path;
        } else {
            $path = null;;
        }


        if (isset($data['interest_ids'])) {
            $interests = $data['interest_ids'];
            unset($data['interest_ids']);
            Interestable::where('interestables_id', Auth::id())->where('interestables_type', 'App\Models\User')->delete();
            foreach ($interests as $id) {
                Interestable::create(['interestables_id'   => Auth::id(),
                                      'interestables_type' => 'App\Models\User',
                                      'interest_id'        => $id]);
            }
        }
        Auth::user()->update($data);
        return true;
    }

    public function show($id)
    {
        return User::whereId($id)->with('interests')->firstOrFail();
    }

    public function getRecommendations($userId = 1)
    {
        $this->data2Excel();
        $recNo    = User::count();
        $response = Http::withHeaders([
                                          'accept' => 'application/json',
                                      ])->attach(
            'csv_file', file_get_contents('exports/data.csv'), 'data.csv'
        )->post('https://xmate.herokuapp.com' . '/recommendations/?required_user=' . $userId . '&recommendations_number=' . $recNo);
        return $response->json()['recommendations'];
    }

    public function data2Excel()
    {
        $interests = Interest::select('name')->orderBy('name', 'asc')->get()->pluck('name')->toArray();
        $header    = array_merge(['id', 'age', 'male', 'female'], $interests);
        $data[]    = $header;

        $prefix    = '';
        $interests = Interest::select('id')->orderBy('name', 'asc')->get()->pluck('id')->toArray();
        $init      = array_fill(0, count($interests) + 4, 0);
        $users     = User::with('interests')->get();

        foreach ($users as $user) {
            $temp    = $init;
            $temp[0] = $prefix . $user->id;
            $temp[1] = (string)Carbon::parse($user->birthday)->age;
            $temp[2] = $user->gender == 'MALE' ? "1" : "0";
            $temp[3] = $user->gender == 'FEMALE' ? "1" : "0";
            foreach ($interests as $key => $interest) {
                $ok = 0;
                foreach ($user->interests as $item) {
                    if ($interest == $item->id) {
                        $ok = 1;
                    }
                }
                $temp[$key + 4] = (string)$ok;

            }
            $data[] = $temp;

        }

        $writer = Writer::createFromPath('exports/data.csv', 'w+');
        $writer->insertAll($data); //using an array
        return true;

    }
}
