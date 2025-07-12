'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHome, faCoffee } from '@fortawesome/free-solid-svg-icons';

export default function Iconos() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>Iconos Font Awesome</h3>
      <FontAwesomeIcon icon={faStar} size="2x" style={{ color: 'gold', marginRight: '15px' }} />
      <FontAwesomeIcon icon={faHome} size="2x" style={{ color: 'green', marginRight: '15px' }} />
      <FontAwesomeIcon icon={faCoffee} size="2x" style={{ color: 'brown' }} />
    </div>
  );
}
