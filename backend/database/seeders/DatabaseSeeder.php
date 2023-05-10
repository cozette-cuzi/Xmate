<?php

namespace Database\Seeders;

use App\Models\Interest;
use App\Models\Interestable;
use App\Models\User;
use App\Services\GroupService;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create(['name'  => 'xmate', 'email' => 'xmate@xmate.com', 'password' => 'secret', 'gender' => 'MALE', 'birthday' => '1997-08-18',
                      'image' => '/public_uploads/images/xmate.png']);
        User::create(['name'  => 'Philip', 'email' => 'Philip@xmate.com', 'password' => 'secret', 'gender' => 'MALE', 'birthday' => '1998-11-11',
                      'image' => '/public_uploads/images/philip.jfif']);
        User::create(['name'  => 'Qusai', 'email' => 'Qusai@xmate.com', 'password' => 'secret', 'gender' => 'MALE', 'birthday' => '1992-08-20',
                      'image' => '/public_uploads/images/Ali.jpeg']);
        User::create(['name'  => 'Albert', 'email' => 'Albert@xmate.com', 'password' => 'secret', 'gender' => 'MALE', 'birthday' => '2001-05-18',
                      'image' => '/public_uploads/images/xmate.png']);
        User::create(['name'  => 'Benjamn', 'email' => 'Benjamn@xmate.com', 'password' => 'secret', 'gender' => 'MALE', 'birthday' => '2000-04-11',
                      'image' => '/public_uploads/images/xmate.png']);
        User::create(['name'  => 'George', 'email' => 'George@xmate.com', 'password' => 'secret', 'gender' => 'MALE', 'birthday' => '1999-03-13',
                      'image' => '/public_uploads/images/xmate.png']);
        User::create(['name'  => 'John', 'email' => 'John@xmate.com', 'password' => 'secret', 'gender' => 'MALE', 'birthday' => '1992-08-14',
                      'image' => '/public_uploads/images/Mark.jpg']);
        User::create(['name'  => 'Cozette', 'email' => 'Cozette@xmate.com', 'password' => 'secret', 'gender' => 'FEMALE', 'birthday' => '1990-11-28',
                      'image' => '/public_uploads/images/cozette.jpg']);
        User::create(['name'  => 'Zsanet', 'email' => 'Zsanet@xmate.com', 'password' => 'secret', 'gender' => 'FEMALE', 'birthday' => '2002-10-28',
                      'image' => '/public_uploads/images/martha.jpg']);
        User::create(['name'  => 'Alexa', 'email' => 'Alexa@xmate.com', 'password' => 'secret', 'gender' => 'FEMALE', 'birthday' => '2001-08-18',
                      'image' => '/public_uploads/images/maria.jpg']);
        User::create(['name'  => 'Samar', 'email' => 'Samar@xmate.com', 'password' => 'secret', 'gender' => 'FEMALE', 'birthday' => '1997-09-16',
                      'image' => '/public_uploads/images/Lily.jpg']);
        User::create(['name'  => 'Maria', 'email' => 'Maria@xmate.com', 'password' => 'secret', 'gender' => 'FEMALE', 'birthday' => '1996-07-26',
                      'image' => '/public_uploads/images/xmate.png']);
        User::create(['name'  => 'Latifa', 'email' => 'Latifa@xmate.com', 'password' => 'secret', 'gender' => 'FEMALE', 'birthday' => '1995-01-06',
                      'image' => '/public_uploads/images/xmate.png']);
        User::create(['name'  => 'Rania', 'email' => 'Rania@xmate.com', 'password' => 'secret', 'gender' => 'FEMALE', 'birthday' => '1997-02-18',
                      'image' => '/public_uploads/images/xmate.png']);


        $interests = [
            'flatmate',
            'roommate',
            'gym',
            'dance',
            'party',
            'hiking',
            'travel',
            'playingcard',
            'football',
            'basketbool',
            'pingpong',
            'billiard',
            'sport',
            'videogames',
            'study',
            'pets',
        ];

        $service              = new GroupService();
        $data                 = [];
        $data['interest_ids'] = [1, 2];
        $data['name']         = 'Rent/Rooms';
        $data['description']  = 'This group is to find a flatmate/roommate/Renting a House .. etc';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [3];
        $data['name']         = 'Gym';
        $data['description']  = 'Are you looking for a gym mate?? this is the suitable group!!';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [4, 5];
        $data['name']         = 'Fun Group!!';
        $data['description']  = 'This group is to find a party mate/event/dancing..etc';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [6, 7];
        $data['name']         = 'Travel/Hiking';
        $data['description']  = 'Mounting and Travel lovers group :D';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [8];
        $data['name']         = 'Playing Cards';
        $data['description']  = 'Playing Cards Mates ONLY XD';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [9, 10, 11, 12, 13];
        $data['name']         = 'Sports';
        $data['description']  = 'The best way to find a sport mate :3';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [14];
        $data['name']         = 'Video Games';
        $data['description']  = 'Are you a gamer and looking for geeks likes you, POST IT HERE';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [15];
        $data['name']         = 'Study Mate';
        $data['description']  = 'This group is FOR Nerds ONLY';
        $service->create($data);

        $data                 = [];
        $data['interest_ids'] = [16];
        $data['name']         = 'Pets Lover';
        $data['description']  = 'The main purpose for this group is to find a sitter for your pet when you are busy!';
        $service->create($data);


        foreach ($interests as $interest) {
            Interest::create(['name' => $interest]);
        }

        $users = User::all();

        foreach ($users as $user) {
            $cnt = rand(1, 5);
            for ($i = 0; $i < $cnt; $i++) {
                $interest = Interest::inRandomOrder()->first();
                Interestable::create(['interestables_id'   => $user->id,
                                      'interestables_type' => 'App\Models\User',
                                      'interest_id'        => $interest->id]);
            }
        }

    }
}
