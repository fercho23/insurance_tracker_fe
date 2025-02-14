'use client';

import { faBookMedical, faStethoscope, faVialCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import classes from './icon-slideshow.module.css';

const icons = [
  { icon: faBookMedical },
  { icon: faStethoscope },
  { icon: faVialCircleCheck },
];

export default function IconSlideshow() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) =>
        prevIndex < icons.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {icons.map((icon, index) => (
        <FontAwesomeIcon
          key={index}
          icon={icon.icon}
          className={index === currentIconIndex ? classes.active : ''}
        />
      ))}
    </div>
  );
}