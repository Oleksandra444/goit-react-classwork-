import { Component } from 'react';
import Modal from 'react-modal';
import { Topic, Wrapper, MetaWrapper, Text, Button } from './QuizCard.styled';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export class QuizCard extends Component {
  state = {
    isModalOpen: false
  }

  openModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));


  };
  closeModal = () => {
    this.setState({
      isModalOpen: false
    })
  };


  render() {
    const { quiz: { id, topic, level, time, questions }, onDelete } = this.props;
    const { isModalOpen } = this.state;
    return (
      <Wrapper level={level}>
        <Topic onClick={this.openModal}>{topic}</Topic>
        <MetaWrapper>
          <Text>
            <b>Level:</b> {level}
          </Text>
          <Text>
            <b>Time:</b> {time}
          </Text>
          <Text>
            <b>Questions:</b> {questions}
          </Text>
        </MetaWrapper>
        <Button onClick={() => onDelete(id)}>Delete</Button>
        <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <button onClick={this.closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      </Wrapper>
    )
   
  }
}
