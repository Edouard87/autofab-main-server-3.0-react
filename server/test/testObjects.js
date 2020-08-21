module.exports = function () {
    this.req = {
        body: {}
    },
    this.res = {
        returned: {
            status: 0,
            data: {}
        },
        status: function (stat) {
            this.returned.status = stat;
        },
        send: function (data) {
            this.returned.data = data;
        },
        end: function () {
            return;
        }
    }
}