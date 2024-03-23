import './App.css';
import AddBillForm from './components/AddBill';
import ViewBills from './components/ViewBills';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <div className="App">
      <h1>Utiltiy Bill Payment System</h1>
      <AddBillForm/>
      <ViewBills/>
    </div>
  );
}

export default App;
