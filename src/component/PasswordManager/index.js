import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import InputItem from '../InputSection'

import './index.css'

class PasswordManager extends Component {
  state = {
    itemList: [],
    websiteInput: '',
    username: '',
    passwordInput: '',
    searchInput: '',
    isChecked: false,
  }

  onAddPasswordList = event => {
    event.preventDefault()
    const {websiteInput, username, passwordInput} = this.state

    const newItem = {
      id: uuidv4(),
      websiteInput,
      username,
      passwordInput,
    }
    this.setState(prevState => ({
      itemList: [...prevState.itemList, newItem],
      websiteInput: '',
      username: '',
      passwordInput: '',
    }))
  }

  onDeleteItem = id => {
    this.setState(prevState => ({
      itemList: prevState.itemList.filter(eachItem => eachItem.id !== id),
    }))
  }

  updateSearchList = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  renderNoPasswordsView = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
        alt="no passwords"
        className="no-password-view"
      />
      <p>No passwords</p>
    </div>
  )

  render() {
    const {
      itemList,
      websiteInput,
      username,
      passwordInput,
      searchInput,
      isChecked,
    } = this.state

    const updatedList = itemList.filter(each =>
      each.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const count = updatedList.length

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="input-logo"
        />
        <div className="top-container">
          <form
            className="add-password-container"
            onSubmit={this.onAddPasswordList}
          >
            <h1 className="password-heading">Add New password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                value={websiteInput}
                placeholder="Enter Website"
                className="input-item"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt=" username"
                className="input-username"
              />
              <input
                type="text"
                value={username}
                placeholder="Enter Username"
                className="input-item"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt=" password"
                className="input-logo"
              />
              <input
                type="password"
                value={passwordInput}
                placeholder="Enter Password"
                className="input-item"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="add-button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        <div className="bottom-container">
          <div className="your-password-container">
            <div className="your-password-text-count">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                className="input-item"
                placeholder="Search"
                onChange={this.updateSearchList}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <input
              type="checkbox"
              checked={isChecked}
              id="showPassword"
              onChange={this.onChecked}
            />
            <label htmlFor="showPassword">Show Passwords</label>
          </div>
          {count === 0 ? (
            this.renderNoPasswordsView()
          ) : (
            <ul className="list-items-container">
              {updatedList.map(each => (
                <InputItem
                  key={each.id}
                  itemDetails={each}
                  isChecked={isChecked}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
