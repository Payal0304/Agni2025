import React from 'react';
import './Conference.css';
import { useQuery,gql } from '@apollo/client';

const conferenceData = {
  "Conference Trecks": [
    { number: 1, desc: "Charging Systems and Infrastructure for sustainable transportations" },
    { number: 2, desc: "Energy Storage Technologies and management systems for sustainable transportation" },
    { number: 3, desc: "Renewable Energy Integration, Control and Management" },
    { number: 4, desc: "Demand Response Management,Stability in Microgrids/Smart Grids and Energy Trading" },
    { number: 5, desc: "AI, ML,data analytics and Cyber Security and IOT Applications to Sustainable Energy and Electric Transportation" },
    { number: 6, desc: "Power and Energy conversions for Sustainable Energy and Transportation Systems" }
  ],
  "Special Trecks": [
    { number: 1, desc: "Advances in Solar PV: Design, Reliability, Integration, Applications, and Sustainability" },
    { number: 2, desc: "Smart management and fault diagnosis in EV battery system" },
    { number: 3, desc: "Innovative and Interdisciplinary Approaches for Sustainable Electrification" },
    { number: 4, desc: "Power System Monitoring, Protection and Control in the Presence of Inverter Based Resources and E-Mobility" },
    { number: 5, desc: "Empowering the Future with Hydrogen-Based Systems" },
    { number: 6, desc: "Innovative Protection Strategies, Resilient Architectures, and Advanced Power Conversion for Next-Generation Energy Systems" },
    { number: 7, desc: "Towards Net-Zero: Sustainable Building Energy Systems & Management"},
    { number: 8, desc: "Advancing Sustainability through Hybrid Renewable Energy Systems"},
    { number: 9, desc: "Decarbonization Methods, Policies, and Tools for a Sustainable Energy Transition"},
    { number: 10, desc: "Cyber-Physical Innovations for a Green Energy-Transportation Future"},
    { number: 11, desc: "Energy management through hierarchical control"}
  ]
};

const Conference = () => {
  const {loading, error, data}=useQuery(gql`
    query Query {
  tracks {
    number
    type
    name
  }
}`);
if(loading)return <div>Loading....</div>
if(error)return <div>Error</div>
if(!data)return <div>NO data</div>
const tracksdata=data?.tracks.reduce((acc, item) => {
  if (!acc[item.type]) {
    acc[item.type] = [];
  }
  acc[item.type].push(item);
  return acc;
}, {});

  return (
    <div className="track-container">
      {Object.entries(tracksdata).map(([type, tracks], index) => (
  <div
    className={`track-card-glass ${index % 2 === 0 ? 'left' : 'right'}`}
    data-aos={index % 2 === 0 ? 'fade-up-right' : 'fade-up-left'}
    key={type}
  >
    <h2 className="track-heading">
      🌱 {type}
    </h2>
    <ul>
      {tracks
        .slice()
        .sort((a, b) => a.number - b.number)
        .map((track) => (
          <li key={track.number} >
            <span className="bullet">{track.number}.</span> {track.name}
          </li>
        ))}
    </ul>
  </div>
))}

      {/* <div className="track-card-glass" data-aos="fade-up-left">
        <h2 className="track-heading">💡 Special Tracks</h2>
        <ul>
          {conferenceData["Special Trecks"].map((track) => (
            <li key={track.number}>
              <span className="bullet">{track.number}.</span> {track.desc}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Conference;
