import {mapState} from "vuex";

export default {
    mounted() {
        if (!this.socketEvents || !this.socket)
            return;
        for (let event in this.socketEvents)
            this.socket.on(event, this.socketEvents[event]);
    },
    computed: {
        ...mapState(['socket']),
        socketEvents() {
            if (!this.$options.events)
                return null;
            if (this.$options.events instanceof Function)
                return this.$options.events.bind(this)();
            return this.$options.events;
        }
    },
    beforeDestroy() {
        if (!this.socketEvents || !this.socket)
            return;
        for (let event in this.socketEvents)
            this.socket.removeListener(event, this.socketEvents[event]);
    },
    watch: {
        socket(val) {
            if (!!val && !!this.socketEvents) {
                for (let event in this.socketEvents)
                    val.on(event, this.socketEvents[event]);
            }
        }
    }
}