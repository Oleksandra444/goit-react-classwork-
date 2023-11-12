import { Component } from 'react';
// import { nanoid } from 'nanoid'
import { Layout } from "./Layout";
import { QuizForm } from './QuizForm/QuizForm'; 
import { SearchBar } from './SearchBar';
import { GlobalStyle } from './GlobalStyle';
import { QuizList } from './QuizList/QuizList';
import { addNewQuize, fetchQuizzez } from 'app';
import { Circles } from 'react-loader-spinner';


// import initialQuizItems from '../quiz-items.json';

const storagaKey = 'quiz-filters';

export class App extends Component {
  state = {
    quizItems: [],
    isLoading: false,
    filters: {
      topic: '',
      level: 'all',
    },
  };

  async componentDidMount() { 
    const savedFilters = window.localStorage.getItem(storagaKey);
    if (savedFilters !== 0) { 
      const filters = JSON.parse(savedFilters);
      this.setState({ filters });
    }

    try {
      this.setState({ isLoading: true })
      const initialQuizzez = await fetchQuizzez();
      console.log(initialQuizzez);
      this.setState({quizItems:initialQuizzez})
    } catch (error) {

    } finally {this.setState({ isLoading: false }) }
    
  }


  componentDidUpdate(prevProps, prevState) {
    console.log('Component did Update')
    if (prevState.filters !== this.state.filters) {
      window.localStorage.setItem(storagaKey, JSON.stringify(this.state.filters))
     }

   }
  
  
  ;

  updateTopicFilter = newTopic => {
    this.setState(
      prevState => {
        return {
          filters: {
            ...prevState.filters,
            topic: newTopic,
          }
        }
      })
  };

  UpdateLevelFilter = newLevel => {
    this.setState(
      prevState => {
        return {
          filters: {
            ...prevState.filters,
            level: newLevel,
          }
        }
      })
  }
  
  resetFilters = () => {
    this.setState({
      filters: {
        topic: '',
        level: 'all',
      },
    })
  };
  
  deleteQuiz = quizId => {
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(item => item.id !== quizId)
      }
    });
  };
  
  addQuiz = async newQuiz => {
    try {
      this.setState({ isLoading: true })
      const addedQuiz = await addNewQuize(newQuiz)
      this.setState(prevState => { 
        return {
          quizItems: [...prevState.quizItems, addedQuiz]
        }

      })
    }
    catch (error) { }
    finally { 
      this.setState({isLoading:false})

    }
  };



    // const quiz = {
    //   ...newQuiz,
    //   id: nanoid(),
    // };
    // this.setState(prevState => {
    //   return {
    //     quizItems: [...prevState.quizItems, quiz],
    //   };
    // });
  
  render() {
    const { quizItems, filters, isLoading } = this.state;

    const visibleQuizItems = quizItems.filter(item => {
      const hasTopic = item.topic.toLowerCase().includes(filters.topic.toLowerCase())

      if (filters.level === 'all') { return hasTopic };

      const matchesLevel = item.level === filters.level;
      return hasTopic && matchesLevel;
    });
    
    return (
      <div>
        <Layout>
          <QuizForm onAdd={this.addQuiz} />
          <SearchBar filters={filters} onUpdateTopic={this.updateTopicFilter} onUpdateLevel={this.UpdateLevelFilter} onReset={this.resetFilters} />

          {isLoading &&
          <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>}
          {visibleQuizItems.length > 0 && <QuizList items={visibleQuizItems} onDelete = { this.deleteQuiz} />}
          <GlobalStyle />
        </Layout>
      </div>
    );
  }
  
  ;
}
