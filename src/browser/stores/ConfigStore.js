var Reflux           = require('reflux');
var ConfigActions    = require('./../actions/ConfigActions');
var DashboardActions = require('./../actions/DashboardActions');
var request          = require('superagent');

var ConfigStore = Reflux.createStore({
    listenables: ConfigActions,

    loadConfig() {
        var appName = location.pathname.substr(1),
            configUrl = "/config";

        if (appName !== "") {
            configUrl = "/config/"+appName;
        }
        request.get(configUrl)
            .end((err, res) => {
                var config = res.body;

                this.trigger(res.body);

                DashboardActions.setDashboards(config.dashboards);
            })
        ;
    }
});

module.exports = ConfigStore;