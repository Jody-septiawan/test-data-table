import { useState, useEffect } from 'react';
import {Table, Container, Row, Col} from 'react-bootstrap'

import data from './data/data.json'

function findProductStock(product_stock, id) {
  let stock = JSON.parse(product_stock)
  let arr = {}
  for(let data of stock){
    arr = { ...arr, ...data}
  }
  return arr[id] ? arr[id] : '0'
}

function App() {

  const [location,_] = useState(data.location)

  const [dataResult,setDataResult] = useState([])

  useEffect(()=>{

    console.clear()

    let newData = data.proformaItem.map((item,idx)=>{

      let jakked = findProductStock(item.product_stock, '1')
      let tangdap = findProductStock(item.product_stock, '3')
      let bekgal = findProductStock(item.product_stock, '5')

      let total = jakked + tangdap + bekgal

      let items = JSON.parse(item.items)[0]

      let percent = (items.qty/total*100).toFixed(2)

      return {
        jakked,
        tangdap,
        bekgal,
        category: item.categoryDescription,
        product: item.productDescription,
        total,
        percent,
        qty: items.qty
      }
    })


    setDataResult(newData)

  },[])

  return (
    <div className='card mx-5 my-3 shadow'>
      <div className='card-body'>
        <Table hover>
          <thead className='thead'>
            <tr>
              {location.map((city,idx)=>(
                <th key={idx}>{city.name}</th>
              ))}
              <th>Category</th>
              <th>Product</th>
              <th>Total Stock</th>
              <th>Percent %</th>
              <th>Total Order</th>
            </tr>
          </thead>
          <tbody>
            {dataResult.map((item,idx)=>(
              <tr key={idx}>
                <td>{item.jakked}</td>
                <td>{item.tangdap}</td>
                <td>{item.bekgal}</td>
                <td>{item.category}</td>
                <td>{item.product}</td>
                <td>{item.total}</td>
                <td>{item.percent} %</td>
                <td>{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
