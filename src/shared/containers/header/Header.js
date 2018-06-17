/* eslint-disable linebreak-style */
import './Header.css';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SearchBox from 'shared/containers/search-box/SearchBox';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import SvgIcon from 'shared/components/icon/SvgIcon';
import { toggleMenu } from 'shared/state/app/actions';

// TODO: show header when scrolling top

class Header extends Component {
    render() {
        return (
            <div className={ `header-component ${this.props.showLogo ? 'has-logo' : ''} ${this.props.showSearch ? 'has-search' : ''}` }>
                <div className="logo">
                    { this.props.showLogo ? <Link to={ '/' }>Facha Search</Link> : '' }
                </div>

                <div className="search-box">
                    { this.props.showSearch ? <SearchBox /> : '' }
                </div>

                <div className="other-actions">
                    <a className="social-link" href="https://twitter.com/npms_io" target="_blank">
                        <SvgIcon id={ SvgIcon.twitter } />
                    </a>
                    <a className="social-link" href="https://github.com/npms-io" target="_blank">
                        <SvgIcon id={ SvgIcon.github } />
                    </a>

                    <div className="toggle-menu">
                        <MaterialIcon id="menu" onClick={ () => this._handleToggleMenuClick() } />
                    </div>
                </div>
            </div>
        );
    }

    _handleToggleMenuClick() {
        this.props.dispatch(toggleMenu());
    }
}

Header.propTypes = {
    showSearch: PropTypes.bool,
    showLogo: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
};

Header.defaultProps = {
    showSearch: false,
    showLogo: true,
};

export default connect()(Header);
