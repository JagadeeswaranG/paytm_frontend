import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allBills } from "../api/Bills";

/*Mybill History*/
function Mybills() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = async () => {
    try {
      // Get all Billing History
      setLoading(true);
      let productsData = await allBills(params.uId);
      setProducts(productsData.data);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <h4 class="head mt-3">My Bills</h4>
        {isLoading ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          products.map((item) => {
            return (
              <div className="col-lg-6">
                <div
                  class="card border-info  mt-3"
                  style={{ maxWidth: "30rem" }}
                >
                  <div class="card-header">
                    {item.title} : <b>₹{item.amount}</b>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">
                      {item.provider} - {item.service}
                    </h5>
                    <p class="card-text">{item.number}</p>
                  </div>
                  <div class="card-footer bg-transparent border-info">
                    {item.createdAt.substring(0, 21)}
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="col-lg-6"></div>
      </div>
    </div>
  );
}

export default Mybills;
