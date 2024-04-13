import React, { useState, useEffect } from 'react'
import { fetchSites, fetchDataForDay } from './data/fetch'

const App = () => {
  // State to store fetched data
  const [sites, setSites] = useState([])
  // State to track loading state
  const [isLoading, setLoading] = useState(true)
  // State to handle error state
  const [error, setError] = useState(false)
  const [dataForDay, setDataForDay] = useState([])
  const [selectedSite, setSelectedSite] = useState('')
  const [selectedSiteId, setSelectedSiteId] = useState(null)

  useEffect(() => {
    try {
      fetchSites().then((sites) => setSites(sites))
    } catch (err) {
      console.error('Error during fetching datas', err)
      setError(true)
    } finally {
      // Set loading state to false once fetching is done (either success or failure)
      setLoading(false)
    }
  }, [])

  const handleClick = (id) => {
    setSelectedSiteId(id)
    const site = sites.find((site) => site.id === id)
    setSelectedSite(site)

    const day = new Date(2024, 3, 1) // Default date

    fetchDataForDay(site.id, day)
      .then((data) => {
        setDataForDay(data)
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des données pour la journée:', err)
        setError(true)
      })
  }

  return (
    <div>
      <h1>Liste des sites :</h1>
      {isLoading ? (
        <p>chargement</p>
      ) : (
        <ul>
          {sites.map((site) => (
            <li key={site.id} onClick={() => handleClick(site.id)}>
              {site.name}
            </li>
          ))}
        </ul>
      )}

      {selectedSiteId ? (
        <div>
          <h2>{selectedSite.name}</h2>
          <img src={selectedSite.picture} />
          <h3>{selectedSite.address}</h3>
          <ul>
            {dataForDay.map((dataPoint, index) => (
              <li key={index}>
                <p>Date: {dataPoint.datetime.toLocaleString()}</p>
                <p>Production: {dataPoint.production}</p>
                <p>Référence: {dataPoint.reference}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Sélectionnez un site pour voir ses informations</p>
      )}

      {error && <p>Une erreur s'est produite lors du chargement des données.</p>}
    </div>
  )
}

export default App
