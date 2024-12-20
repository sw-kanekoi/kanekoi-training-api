import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress } from "./store/addressSlice";

function App() {
  const [zipcode, setZipcode] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <h3>住所検索</h3>
      <Input
        onChange={(e) => setZipcode(e.target.value)}
        onClick={() => dispatch(fetchAddress({ zipcode: zipcode }))}
      />
      <Address />
    </>
  );
}

function Input({ onChange, onClick }) {
  return (
    <>
      <label>
        <p>
          郵便番号：
          <input type="text" onChange={onChange} />
        </p>
        <button onClick={onClick}>検索</button>
      </label>
    </>
  );
}

function Address() {
  let address = useSelector((state) => state.addressSlice.address);
  let error = useSelector((state) => state.addressSlice.error);
  return (
    <>
      {address && !error ? (
        <ul>
          <li><p>都道府県名：{address.address1}</p></li>
          <li><p>市区町村名：{address.address2}</p></li>
          <li><p>町域名：{address.address3}</p></li>
        </ul>
      ) : (
        <div>
            <p>郵便番号を7桁で入力してください</p>
            <p>{error}</p>
        </div>
        
      )}
    </>
  );
}

export default App;
