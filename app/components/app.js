var Fluxxor = require('fluxxor'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

var LoginOverlay = require('./login-overlay'),
    AppLoader = require('./app-loader/index'),
    Toast = require('./toast'),
    Dashboard = require('./dashboard');


var App = React.createClass({
    mixins: [
        Fluxxor.FluxMixin(React),
        createStoreWatchMixin('AppStore', 'TargetsStore'),
        Router.State
    ],

    getStateFromFlux: function() {
        return {
            app: this.getFlux().store('AppStore'),
            targets: this.getFlux().store('TargetsStore')
        };
    },

    render: function() {
        if (!this.state.app.inited) {
            return (
                <AppLoader />
            );
        }

        if (!this.state.app.isLogedIn) {
            return (
                <LoginOverlay />
            );
        }

        return (
            <div>
                <RouteHandler />
                <Toast />
            </div>
        );
    }
});

module.exports = App;
