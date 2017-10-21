import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
class ListContacts extends Component {
  state = {
    query: ""
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  clearQuery = () => {
    this.setState({query: ""})
  }

  render() {

    const {contacts, onDeleteContact} = this.props
    const {query} = this.state

    let showingContacts
    if (query) {
      let match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((c) => {
        return match.test(c.name);
      })
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input className="search-contacts" value={query} placeholder="Search Contacts ...." onChange={(event) => this.updateQuery(event.target.value)}></input>
          <Link to="/create" className="add-contact">Add Contact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map(contact => {
            return (
              <li key={contact.name} className="contact-list-item">
                <div className="contact-avatar" style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}></div>
                <div className="contact-details">
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button className="contact-remove" onClick={() => onDeleteContact(contact)}>Remove</button>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts;
