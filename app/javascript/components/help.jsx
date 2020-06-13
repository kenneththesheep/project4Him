import React from 'react'

import ChatBot from 'react-simple-chatbot';



class Help extends React.Component {




  render() {


    return (
    <div>
      <div className="row">
        <ChatBot headerTitle="Help Chat"
                 speechSynthesis={ { enable: true, lang: 'zh-HK' } }
                 steps={ [ { id: '1', message: 'Good day, what would you like to do?', trigger: '2', }, { id: '2', options: [ { value: 1, label: 'Contact information', trigger: '4' }, { value: 2, label: 'How do I add or view stuff?', trigger: '3' }, { value: 3, label: 'How do I arrange stuff?', trigger: '5' }, { value: 4, label: 'Greet', trigger: '6' }, { value: 5, label: 'Request for stuff', trigger: '9' }, ], }, { id: '3', message: 'Click on Inventory and click on the correct tab.', trigger: '2', }, { id: '4', message: 'You can contact me at kenneththesheep@gmail.com or 9 6 1 8 7 8 4 9', trigger: '2' }, { id: '5', message: 'Click on Allocation and click refresh', trigger: '2', }, { id: '6', message: 'What is your name?', trigger: '7', }, { id: '7', user: true, trigger: '8', }, { id: '8', message: 'Hi {previousValue}, nice to meet you!', trigger: '2', }, { id: '9', message: 'Here are the dummy steps. Step 1: Go to inventory. Step 2: Click on Request for individual item. Step 3: Go to Cart and finally Click on Submit Request.', trigger: '2' }, ] } />
      </div>
    </div>
    );
  }
}

export default Help
