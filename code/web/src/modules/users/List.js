// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import { getList as getUsersList } from './api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import CrateItem from './Item'


// Component
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getUsersList('ASC'))
  }

  // Runs on client only
  componentDidMount() {
    this.props.getUsersList('ASC')
  }

  render() {
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Crates for everyone! - Crate</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Crates for everyone!</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>You can choose crate which suits your need. You can also
              subscribe to multiple crates.</p>
          </GridCell>
        </Grid>

        {/*user list */}
        <Grid>
          <GridCell>
            {
              this.props.users.isLoading
                ? <Loading/>
                : this.props.users.list.length > 0
                    ? this.props.users.list.map(user => (
                      <div key={user.id} style={{ margin: '2em', float: 'left' }}>
                        <CrateItem user={user}/>
                      </div>
                    ))
                    : <EmptyMessage message="No crates to show" />
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  users: PropTypes.object.isRequired,
  getUsersList: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    users: state.users
  }
}

export default connect(listState, { getUsersList })(List)
