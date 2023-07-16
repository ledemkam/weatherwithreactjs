 import loader from "./assets/loader.svg"
 import browser from "./assets/browser.svg"
 import "./App.css"
import { useEffect, useState } from "react"
 const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

const App = () => {
  const [wetherData,setWetherData] = useState(null)
  const [errorinfo,setErrorInfo] = useState(null)

  useEffect(()=>{
     fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
     .then(response => {
      console.log(response)
      return response.json()
     })
     .then(responseData => {
      console.log(responseData)
      setWetherData({
        city: responseData.data.city,
        country: responseData.data.country,
        iconId: responseData.data.current.weather.ic,
        temperature: responseData.data.current.weather.tp
      })
    })
      .catch(err =>{ 
        setErrorInfo(err.message)
         })
  },[])
  return (
    <main>
      <div className={`loader-container ${(!wetherData  && !errorinfo)&& "active"}`}>
        <img src={loader} alt="loading icon" />
      </div>
      {wetherData && (
        <>
          <p className="city-name">{wetherData.city}</p>
          <p className="country-name">{wetherData.country}</p>
          <p className="temperature">{wetherData.temperature}</p>
           <div className="info-icon-container">
              <img src={`/icons/${wetherData.iconId}.svg`} alt="weather" className="info-icon" />
           </div>
        </>
      )

      }
      {(errorinfo && !wetherData) && (
            <>
             <p className="error-information">{errorinfo}</p>
                      <img src={browser} alt="browser error"/>
            </>
      )}


    </main>
  )
}
export default App