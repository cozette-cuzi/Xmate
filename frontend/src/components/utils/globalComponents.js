import ChooseCaptainMulti from '@/components/utils/input/ChooseCaptainMulti';
import ChoosePermissionsMulti from "@/components/utils/input/ChoosePermissionMulti";
import ChooseImage from "@/components/utils/input/ChooseImage";
import ChooseRole from "@/components/utils/input/ChooseRole";
import ChooseGender from "@/components/utils/input/ChooseGender";
import ChooseDate from "@/components/utils/input/ChooseDate";
import ChooseVoucher from "@/components/utils/input/ChooseVoucher";
import ChooseTime from "@/components/utils/input/ChooseTime";
import ChooseNumbers from "@/components/utils/input/ChooseNumbers";
import ChooseAppearanceConstrain from "@/components/utils/input/ChooseAppearanceConstrain";
import ChooseLocationMulti from "@/components/utils/input/ChooseLocationMulti";
import {VSelect} from "vuetify/lib/components/VSelect";
export default {
    "choose-captains-multi": ChooseCaptainMulti,
    'choose-permissions-multi': ChoosePermissionsMulti,
    'choose-image-single': ChooseImage,
    'choose-role': ChooseRole,
    'choose-gender': ChooseGender,
    'choose-date': ChooseDate,
    'choose-voucher': ChooseVoucher,
    'choose-time': ChooseTime,
    'choose-numbers': ChooseNumbers,
    'choose-appearance-constrain' : ChooseAppearanceConstrain,
    'choose-locations' : ChooseLocationMulti,
    "v-select" : VSelect
};
