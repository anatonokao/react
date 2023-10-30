import './App.css';
import React, { Component } from 'react';
import Header from './components/Header/Header';
import SearchingResults from './components/SearchingResults/SearchingResults';
import { Item } from './types/Interfaces';
import Loading from './assets/Loading.gif';

interface AppState {
  error: boolean;
  isLoaded: boolean;
  searchValue: string;
  results: HttpResponse;
  inputValue: string;
}

interface AppProps {}

interface HttpResponse {
  count: number;
  next: string;
  previous: string;
  results: Item[];
}

export async function http<T>(request: string): Promise<T> {
  const response = await fetch(request).catch((error) => {
    return error;
  });
  return await response.json();
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem('request') || '',
      inputValue: localStorage.getItem('request') || '',
      error: false,
      isLoaded: true,
      results: {
        count: 0,
        next: '',
        previous: '',
        results: [],
      },
    };
  }

  async componentDidMount() {
    if (this.state.inputValue) {
      this.setState((prevState) => ({ ...prevState, isLoaded: false }));
      http<HttpResponse>(
        `https://swapi.dev/api/people?search=${this.state.inputValue}`
      )
        .then((result) => {
          this.setState((prevState) => ({
            ...prevState,
            error: false,
            isLoaded: true,
            results: result,
          }));
        })
        .catch((error) => {
          console.log(error);
          this.setState((prev) => ({ ...prev, error: true }));
        });
    }
  }

  throwError = () => {
    this.setState((prevState) => ({
      ...prevState,
      error: true,
    }));
  };

  changeInputHandler = (value: string) => {
    this.setState((prevState) => ({
      ...prevState,
      inputValue: value,
    }));
  };

  searchHandler = (value: string) => {
    this.setState((prevState) => ({
      ...prevState,
      isLoaded: false,
      searchValue: value.trim(),
    }));
    http<HttpResponse>(
      `https://swapi.dev/api/people?search=${value.trim()}`
    ).then((result) => {
      this.setState((prevState) => ({
        ...prevState,
        error: false,
        isLoaded: true,
        results: result,
      }));
    });
    localStorage.setItem('request', value);
  };

  render() {
    const { error, isLoaded, results } = this.state;
    const resultsItems: Item[] = results.results;

    if (error) throw new Error("I'm crashed!");
    else if (!isLoaded) {
      return (
        <div className="wrapper">
          <div className="loading">
            <img src={Loading} alt="Loading" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <Header
            searchHandler={this.searchHandler}
            searchValue={this.state.searchValue}
            inputValue={this.state.inputValue}
            changeInputHandler={this.changeInputHandler}
            throwError={this.throwError}
          />
          {this.state.results.results.length ? (
            <SearchingResults items={resultsItems} />
          ) : (
            <p className="weCantFind">
              We cant find anything <br /> (Try: R2D2, Darth Vader and other
              characters )
            </p>
          )}
        </div>
      );
    }
  }
}

export default App;
