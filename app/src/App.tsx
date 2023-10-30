import './App.css';
import React, { Component } from 'react';
import Header from './components/Header/Header';
import SearchingResults from './components/SearchingResults/SearchingResults';
import { Item } from './types/Interfaces';

interface AppState {
  error: boolean;
  isLoaded: boolean;
  results: HttpResponse;
}

interface HttpResponse {
  count: number;
  next: string;
  previous: string;
  results: Item[];
}

export async function http<T>(request: string): Promise<T> {
  const response = await fetch(request);
  return await response.json();
}

class App extends Component<AppState, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,
      results: {
        count: 0,
        next: '',
        previous: '',
        results: [],
      },
    };
  }

  async componentDidMount() {
    this.setState((prevState) => ({ ...prevState, isLoaded: false }));
    http<HttpResponse>('https://swapi.dev/api/people/').then((result) => {
      this.setState({
        error: false,
        isLoaded: true,
        results: result,
      });
    });
  }

  render() {
    const { error, isLoaded, results } = this.state;
    const resultsItems: Item[] = results.results;

    if (error) {
      return <>ERROR!!!!!</>;
    } else if (!isLoaded) {
      // return <Loading />;
      return <p>Loading</p>;
    } else {
      console.log(this.state);

      return (
        <div className="wrapper">
          <Header />
          <SearchingResults items={resultsItems} />
          {/*<Footer/>*/}
        </div>
      );
    }
  }
}

export default App;
