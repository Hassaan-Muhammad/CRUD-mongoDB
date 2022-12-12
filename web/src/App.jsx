

import { useState } from "react"
import axios from "axios";

import { useFormik } from 'formik';
import * as yup from 'yup';

let baseURL = ``;
if (window.location.href.split(":")[0] == "http") {
  baseURL = `http://localhost:5003`;
}


function App() {

  const myFormik = useFormik({
    initialValues: {
      ProductName: '',
      ProductPrice: '',
      ProductDescription: '',
    },
    validationSchema:
      yup.object({
        ProductName: yup
          .string('Enter your product name')
          .required('Product name is required')
          .min(3, "please enter more then 3 characters ")
          .max(20, "please enter within 20 characters "),

          ProductPrice: yup
          .number('Enter your product Price')
          .required('Product price is required')
          .positive("Enter positive product price"),

          ProductDescription: yup
          .string('Enter your product Descrpition')
          .required('Product description is required')
          .min(3, "please enter more then 3 characters ")
          .max(500, "please enter within 20 characters "),
      }),
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.post(`${baseURL}/product`)
        .then(response => {
          console.log("response: ", response.data);

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });



  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   console.log("I am click handler")
  //   axios.get(`${baseURL}/weather`)
  //     .then(response => {
  //       console.log("response: ", response.data);

  //       setWeatherData(response.data);
  //     })
  //     .catch(err => {
  //       console.log("error: ", err);
  //     })
  // }

  return (
    <div>

      <form onSubmit={myFormik.handleSubmit}>
        <input
          id="ProductName"
          placeholder="Product Name"
          value={myFormik.values.ProductName}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.ProductName && Boolean(myFormik.errors.ProductName)) ?
            <span style={{ color: "red" }}>{myFormik.errors.ProductName}</span>
            :
            null
        }
        <br />

        <input
          id="ProductPrice"
          placeholder="Product Price"
          value={myFormik.values.ProductPrice}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.ProductPrice && Boolean(myFormik.errors.ProductPrice)) ?
            <span style={{ color: "red" }}>{myFormik.errors.ProductPrice}</span>
            :
            null
        }

        <br />

        <input
          id="ProductDescription"
          placeholder="City Name"
          value={myFormik.values.ProductDescription}
          onChange={myFormik.handleChange}
        />
        {
          (myFormik.touched.ProductDescription && Boolean(myFormik.errors.ProductDescription)) ?
            <span style={{ color: "red" }}>{myFormik.errors.ProductDescription}</span>
            :
            null
        }

        <br />

        <button type="submit"> Submit </button>
      </form>

      <br />
      <br />


    </div>
  );
}

export default App;


