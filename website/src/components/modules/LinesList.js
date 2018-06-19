import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import animateRoute from 'utils/animateRoute'
import normalizeChars from 'utils/normalizeChars'

function LinesList({ lines, status, position, title, history }) {
  const statusEnum = {
    'Operação Normal': 'positive',
    'Operação Encerrada': 'negative',
    'Operações Encerradas': 'negative',
    'Operação Parcial': 'warning',
    'Velocidade Reduzida': 'warning',
    'Paralisada': 'negative',
    'Dados Indisponíveis': 'negative'
  };

  const renderLineListItems = () => {
    if (lines.length) {
      return lines.map(line => {
        const goToLine = line => {
          animateRoute('leave');
          setTimeout(() => {
            history.push(`/line/${line.id}`)
          }, 300);
        }

        return (
          <li className="list-line-item" key={line.id} onClick={() => goToLine(line)}>
            <span className={`line-icon -${normalizeChars(line.color.toLowerCase())}`}></span>
            <span className="line-name">{line.name}</span>
            <span className={`line-status -${statusEnum[line.status]}`}>{line.status}</span>
          </li>
        )
      })
    } return renderLoader();
  }

  const renderLoader = () => {
    return (
      <div className="scene">
        <svg
        version="1.1"
        id="dc-spinner"
        xmlns="http://www.w3.org/2000/svg"
        x="0px" y="0px"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        preserveAspectRatio="xMinYMin meet"
        >

        <path fill="#999" stroke="#999" strokeWidth="0.6027" strokeMiterlimit="10" d="M5.203,20
      			c0-8.159,6.638-14.797,14.797-14.797V5C11.729,5,5,11.729,5,20s6.729,15,15,15v-0.203C11.841,34.797,5.203,28.159,5.203,20z">
        <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              calcMode="spline"
              keySplines="0.4, 0, 0.2, 1"
              keyTimes="0;1"
              dur="1s"
              repeatCount="indefinite" />
         </path>

        <path fill="#ccc" stroke="#ccc" strokeWidth="0.2027" strokeMiterlimit="10" d="M7.078,20
        c0-7.125,5.797-12.922,12.922-12.922V6.875C12.763,6.875,6.875,12.763,6.875,20S12.763,33.125,20,33.125v-0.203
        C12.875,32.922,7.078,27.125,7.078,20z">
         <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.8s"
            repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    )
  }

  return (
    <div className={`line-list-container -${position}`}>
      <h2 className={`title-${title}`}>{title}</h2>
      <ul className={`line-list`}>
        {renderLineListItems()}
      </ul>
    </div>
  )
}

export default withRouter(LinesList)
