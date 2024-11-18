import { useState } from 'react';
import './App.css';
import AgregarActividad from './AgregarActividad/AgregarActividad';
import DetalleActividad from './DetalleActividad/DetalleActividad'; 
import ItemActividad from './ItemsActividad/ItemsActividad';
import datos from './data/jiji.json';

function App() {
  const blankData = {
    "id":"", 
    "nombre":"",
    "descripcion":"", 
    "estado":false, 
    "fecha":""
  };

  const [data, setData] = useState(datos);
  const [itemData, setItemData] = useState(blankData);

  const handleClicAdd = (value) => {
    setData(value);
  };

  const handleClicDetail = (value) => {
    setItemData(value);
  };

  const handleClickUpdate = (value) => {
    const dataUpdate = data.map((item) => {
      if (item.id === value.id) {
        return { ...item, ...value };
      }
      return item;
    });
    setItemData(value);
    setData(dataUpdate);
  };

  const handleDeleteActivity = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    setItemData(blankData);
  };

  return (
    <div className="principal">
      <header className="header">To Do List</header>
      <div className="principal ladero"> 
        <AgregarActividad dato={data} agregar={handleClicAdd} />
        <DetalleActividad 
          itemData={itemData} 
          changeActivity={handleClickUpdate} 
          deleteActivity={handleDeleteActivity} 
        />
      </div>
      <section className="lista">
        <h2>Lista de actividades</h2>
        {data.map((value, index) => (
          <ItemActividad 
            key={index}
            id={value.id}
            data={value}
            viewDetail={() => handleClicDetail(value)} 
          />
        ))}
      </section>
    </div>
  );
}

export default App;
