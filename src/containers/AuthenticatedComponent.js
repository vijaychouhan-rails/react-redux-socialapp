import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

function is_client() {
   return (typeof window != 'undefined' && window.document);
}

export function requireAuthentication(WrappedComponent) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
        }

        // componentWillReceiveProps (nextProps) {
        //     console.log("componentWillReceiveProps")
        //     replace('/posts')
        //     //this.checkAuth(isAuthenticated);
        // }

        checkAuth (isAuthenticated) {
            console.log("is_client()")
            console.log(is_client())
            console.log("end is_client()")
            if(is_client()){
                if (!isAuthenticated) {
                    let redirectAfterLogin = this.props.location.pathname;
                    browserHistory.push(`/login?redirect=${redirectAfterLogin}`);
                }
            }
            else{

            }
        }

        render () {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.getIn(['user', 'isSignedIn']),
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}
