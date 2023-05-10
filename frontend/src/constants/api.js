// THE MAIN URL FOR THE API

const hostName = window.location.hostname;
const online = hostName.toLowerCase() === 'xmate-heroku.herokuapp.com';
const scheme = window.location.protocol;
let MAIN_HOST, SOCKET_HOST;

if (!online) {
    MAIN_HOST = `http://${hostName}:8000`;
} else if (hostName.toLowerCase() === 'xmate-heroku.herokuapp.com') {
    MAIN_HOST = `${scheme}//xmate-heroku.herokuapp.com`;
} else {
    MAIN_HOST = `http://${hostName}:8000`;
}
import avatar from "@/assets/avatar.jpg";

export const IMAGES_MAIN_URL = MAIN_HOST;

export default {
    MAIN_URL: MAIN_HOST,
    IMAGES_URL: IMAGES_MAIN_URL,
    GET_IMAGE(url) {
        if (url == '0' || url == null) return avatar;
        return IMAGES_MAIN_URL + '/' + (url[0] === '/' ? url.substr(1) : url)
    },
    ACTIONS: {
        REGISTER: '/register',
        GROUPS: '/group',
        GROUP: (id) => `group/${id}`,
        JOIN_GROUP: (id) => `join-group/${id}`,
        POST: (id) => `posts/${id}`,
        POSTS: 'posts',
        ADD_COMMENT:(id) => `posts/${id}/add-comment`,
        LIKE_TOGGLE:(id) => `posts/${id}/like-toggle`,
        MATED_TOGGLE:(id) => `posts/${id}/mated-toggle`,
        INTERESTS: '/predefined/interests',
        UPDATE_PROFILE: '/profile/update',
        BROADCAST_PRESETS: 'broadcast-preset',
        SUGGESTION_ALLOWED_CAPTAIN: 'suggestion_allowed_captain',
        CAPTAIN_STATISTICS: 'statistics/captain/all_performance',
        CAPTAIN_ACCEPTANCE_RATIO: 'statistics/captain/all_acceptance_ratio',
        DISPATCH_BOOKINGS: 'booking/dispatch',
        LOCATION_CLUSTER: 'location_cluster',
        OSM: 'statistics/osm',
        BOOKINGS: 'booking',
        LOGIN: 'login',
        LOGOUT: 'logout',
        CHECK_TOKEN: 'check_auth',
        USER: (id) => `/profile/user/${id}`,
        LOCATIONS: 'location',
        PASSENGERS: 'passenger',
        SERVICES: 'service',
        BONUS_PACKAGE: 'bonus_package',
        REGISTRATION_REQUESTS: 'registration_request',
        SERVICE_PRICES: (id) => `service/${id}/prices`,
        SERVICE_CARS: (id) => `service/${id}/cars`,
        UPDATE_CAR_DATA: (id) => `car/${id}`,
        SERVICE_LOCATIONS: (id) => `service/${id}/locations`,
        RIDE: 'ride',
        JOIN_RIDE: ride_id => `ride/${ride_id}/join`,
        ROLES: 'role',
        PERMISSIONS: 'permission',
        CAPTAINS: 'captain',
        QR_CODE: 'get_qr_code',
        CAPTAIN_CARS: captain_id => `captain/${captain_id}/cars`,
        CAPTAIN_REQUEST_RESET_PASSWORD: 'captain/request_reset',
        CAR_BRANDS: 'car_brand',
        VEHICLE_TYPE: 'vehicle_type',
        CAR_BRAND_MODELS: (id) => `car_brand/${id}/models`,
        COLORS: 'color',
        BANKS: 'bank',
        PackageType: 'package_type',
        NOTES: 'note',
        NATIONALITIES: 'nationality',
        PHONE_VOUCHERS: 'phone_voucher',
        VOUCHERS: 'voucher',
        FIRST_RIDE_PAX: 'customer_care/first_ride_pax',
        ANAS: 'customer_care/anas_stats',
        DEMAND_PUMP: 'voucher/demand_pump',
        LOGS: 'log',
        RANDOM_VOUCHER: 'voucher/random',
        CHECK_LOGS: 'check_log',
        TIMELINE: 'timeline',
        REDISPATCH_BOOKING: bookingId => `booking/${bookingId}/redispatch`,
        AVAILABLE_INTERVIEW_TIMES: 'available_interview_time',
        INTERVIEW_SLICE: 'available_interview_time/slice',
        INTERVIEW_MAX_CAPTAINS: `available_interview_time/max_captains`,
        INTERVIEW_STATUS: 'interview_status',
        INTERVIEWS: 'interview',
        CAPTAIN_SCHEDULE: captainId => `captain/${captainId}/schedule`,
        PENALTY: 'penalty',
        SETTINGS: 'setting',
        CAPTAIN_TRANSACTIONS: captainId => `captain/${captainId}/transactions`,
        PASSENGER_TRANSACTIONS: passengerId => `passenger/${passengerId}/transactions`,
        LOCATION_CONTAINERS: 'location_container',
        BONUSES_REQUEST: 'bonus_request',
        STATISTICS: 'statistic',
        LANDMARKS: 'landmark',
        PASSENGER_RATING_CAUSES: 'passenger_rating_cause',
        CAPTAIN_RATING_CAUSES: 'captain_rating_cause',
        PASSENGER_ID_CONVERTER: 'passenger_id_converter',
        TICKETS: 'ticket',
        TICKET_ASSIGN: ticket_id => 'ticket/' + ticket_id + '/assign',
        USER_STATS: user_id => `user/${user_id}/stats`,
        USER_ALL_STATS: 'user/stats',
        CAPTAIN_BLACKLIST_HISTORY: id => `captain/${id}/blacklist_log`,
        SERVICE_EXTRA_CHARGES: service_price_id => `service_price/${service_price_id}/extra_charge`,
        CANCELLATION_TICKETS: 'ticket/cancellation',
        BLACKLIST_LOCATIONS: 'blacklist_location',
        LOST_CAPTAINS: "lost_captain",
        CAPTAIN_TIMELINE: id => `captain/${id}/timeline`,
        PRESENT_CAPTAINS: `captain/weekly_present`,
        CAPTAIN_RATINGS: id => `captain/${id}/ratings`,
        CAPTAIN_RATING_STATS: id => `captain/${id}/rating_stats`,
        ALL_END_RIDES: "timeline/end_rides",
        GHOST_RIDES: 'ghost_ride',
        USER_SCHEDULE: 'user_schedule',
        SUGGEST_SERVICE_CHANGE: booking_id => `booking/${booking_id}/suggest_service_change`,
        MONEY_TRANSFER: 'money_transfer',
        USER_META: user => `user/${user}/meta`,
        GET_LOGIN_IDENTFIER: `user/identifier`,
        CAPTAIN_CANCELLATION_REASONS: "captain_cancellation_reason",
        INCOMPLETE_CAPTAIN: 'incomplete_captain'
    },
    SOCKET: {
        CAPTAINS: SOCKET_HOST + 'captains',
        USERS: SOCKET_HOST + 'users',
        GUESTS: SOCKET_HOST + 'guests',
        EVENTS: {
            CAPTAIN_UPDATED_LOCATION: 'captain_location_updated',
            BOOKINGS_WERE_APPROVED: 'approved_bookings',
            NEW_PENDING_BOOKING: 'Timeline:new_booking',
            NEW_NOW_BOOKING: 'Ai:new_now_booking',
            NEW_NOTIFICATION: 'Dashboard:new_notification',
            DELETE_BOOKING: 'Timeline:remove_booking',
            UPDATE_BOOKING: 'Timeline:update_booking',
            NEW_ACTION: 'Ride:new_action',
            LATE_BOOKING: "Dashboard:late_booking",
            LATE_CAPTAIN: "Dashboard:late_captain",
            ESTIMATED_START_LATENESS: "Dashboard:estimated_start_lateness",
            ESTIMATED_END_LATENESS: "Dashboard:estimated_end_lateness",
            UPDATE_BOOKING_STATUS: 'Timeline:update_booking_status',
            UPDATE_END_RIDE: "Timeline:update_end_ride",
            NEW_TICKET: "Dashboard:new_ticket",
            DISMISS_TICKET: "Dashboard:dismiss_ticket"
        }
    },
    mapBox: {
        accessToken: "pk.eyJ1IjoibWFqZHNhbGxvdW0iLCJhIjoiY2pzYWlqdGQ2MDJheDN5bG50aWl1bW1wMCJ9.6vf9T_7a6HgGvdH33BtrwA",
        style: "mapbox://styles/majdsalloum/cjsailsar04mb1frz6xe8w6mj",
        center: [55.270782,25.204849],
        zoom: 12
    },
    CONSTANTS: {
        STATES: [
            "Abu Dhabi",
            "Ajman",
            "Al Ain",
            "Al Madam",
            "Ar-Rams",
            "Dhaid",
            "Dibba Al-Fujairah",
            "Dibba Al-Hisn",
            "Dubai",
            "Fujairah",
            "Ghayathi",
            "Hatta",
            "Jebel Ali",
            "Kalba",
            "Khor Fakkan",
            "Liwa Oasis",
            "Madinat Zayed",
            "RAK City",
            "Ruwais",
            "Sharjah",
            "Umm al-Quwain"
        ],
        GENDERS:[
            'MALE',
            'FEMALE'
        ],

        WHATSAPP_NUMBERS: [
            '971965656008',
            '971954044416',
            '971965656005',
            '971660805740'
        ],
        ACCOUNT_ENTRY_TYPES: [
            'wallet_migration',
            'ride',
            'payment',
            'passenger_penalty',
            'captain_penalty',
            'closing_payment',
            'payment_approval',
            'passenger_bonus',
            'captain_bonus'
        ],
        GENDER: {
            MALE: 1,
            FEMALE: 0
        },
        COLOR_INDICATORS: {
            PENDING: "#9f43cf",
            CONFIRMED: "#8e8e88",
            STARTED: "#428bca",
            ARRIVED: "#ffa60c",
            PICKED_UP: "#e04b4a",
            DONE: "#69b869",
        }
    },
};
