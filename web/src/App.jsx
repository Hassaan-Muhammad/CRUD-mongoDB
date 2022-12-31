import axios from "axios";
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import * as yup from 'yup';

let baseURL = `http://localhost:5001`;
// if (window.location.href.split(":")[0] === "http") {
//   baseURL = ``;
// }


function App() {

  const [products, setProducts] = useState([]);
  const [Loadproduct, setLoadProduct] = useState(false)
  const [IsEditMode, setIsEditMode] = useState(false)
  const [EditingProduct, setEditingProduct] = useState(null)





  const getAllProducts = async () => {

    try {
      const response = await axios.get(`${baseURL}/products`)
      console.log("response: ", response.data);

      setProducts(response?.data?.data)

    } catch (error) {
      console.log("Errror in getting all products", error)
    }
  }


  const deleteProduct = async (id) => {

    try {
      const response = await axios.delete(`${baseURL}/product/${id}`)
      console.log("response: ", response.data);

      setLoadProduct(!Loadproduct)

    } catch (error) {
      console.log("Errror in getting all products", error)
    }
  }


  const editMode = (product) => {
    setIsEditMode(!IsEditMode)
    setEditingProduct(product)

    EditFormik.setFieldValue("Product Name", product.name)
    EditFormik.setFieldValue("Product Price", product.price)
    EditFormik.setFieldValue("Product Description", product.description)


  }








  
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

      axios.post(`${baseURL}/product`, {
        name: values.ProductName,
        price: values.ProductPrice,
        description: values.ProductDescription
      })
        .then(response => {
          console.log("response: ", response.data);
          setLoadProduct(!Loadproduct)
        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });

  const EditFormik = useFormik({
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

      axios.put(`${baseURL}/product/${EditingProduct._id}`, {
        name: values.ProductName,
        price: values.ProductPrice,
        description: values.ProductDescription
      })
        .then(response => {
          console.log("response: ", response.data);
          setLoadProduct(!Loadproduct)
        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });

  useEffect(() => {
    getAllProducts();

  }, [Loadproduct])




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
          placeholder="Product Description"
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

      <div>
        {products.map((eachProduct, i) => (
          <div key={eachProduct._id} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
            <h2>{eachProduct.name}</h2>
            <p>{eachProduct._id}</p>
            <h5>{eachProduct.price}</h5>
            <p>{eachProduct.description}</p>

            <button onClick={() => { deleteProduct(eachProduct._id) }} >DELETE</button>

            <button onClick={() => { editMode(eachProduct) }} >EDIT</button>


            {(IsEditMode && EditingProduct._id === eachProduct._id) ?
              <div>

                <form onSubmit={EditFormik.handleSubmit}>
                  <input
                    id="ProductName"
                    placeholder="Product Name"
                    value={EditFormik.values.ProductName}
                    onChange={EditFormik.handleChange}
                  />
                  {
                    (EditFormik.touched.ProductName && Boolean(EditFormik.errors.ProductName)) ?
                      <span style={{ color: "red" }}>{EditFormik.errors.ProductName}</span>
                      :
                      null
                  }
                  <br />

                  <input
                    id="ProductPrice"
                    placeholder="Product Price"
                    value={EditFormik.values.ProductPrice}
                    onChange={EditFormik.handleChange}
                  />
                  {
                    (EditFormik.touched.ProductPrice && Boolean(EditFormik.errors.ProductPrice)) ?
                      <span style={{ color: "red" }}>{EditFormik.errors.ProductPrice}</span>
                      :
                      null
                  }

                  <br />

                  <input
                    id="ProductDescription"
                    placeholder="Product Description"
                    value={EditFormik.values.ProductDescription}
                    onChange={EditFormik.handleChange}
                  />
                  {
                    (EditFormik.touched.ProductDescription && Boolean(EditFormik.errors.ProductDescription)) ?
                      <span style={{ color: "red" }}>{EditFormik.errors.ProductDescription}</span>
                      :
                      null
                  }

                  <br />

                  <button type="submit"> Submit </button>
                </form>


              </div> : null}


          </div>
        ))}
      </div>


    </div>
  );
}

export default App;


