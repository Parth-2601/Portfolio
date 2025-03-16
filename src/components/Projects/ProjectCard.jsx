import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({ project: { title, imageSrc, description, demoImages, source } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add(styles.modalOpen); // Add class to body for blur effect
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove(styles.modalOpen); // Remove class to body for blur effect
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % demoImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + demoImages.length) % demoImages.length);
  };

  const truncateDescription = (text, maxLines = 4) => {
    const words = text.split(" ");
    return words.length > maxLines * 10 ? words.slice(0, maxLines * 10).join(" ") + "..." : text;
  };

  return (
    <div className={styles.container}>
      <img src={getImageUrl(imageSrc)} alt={`Image of ${title}`} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{truncateDescription(description)}</p>
      <div className={styles.linksWrapper}>
        <div className={styles.links}>
          <button onClick={openModal} className={styles.link}>Preview</button>
          <a href={source} className={styles.link}>Source</a>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalHeading}>{title}</h2>
            <button className={styles.closeButton} onClick={closeModal}>✖</button>
            <div className={styles.slider}>
              <button className={styles.prevButton} onClick={prevSlide}>{"<"}</button>
              <img src={getImageUrl(demoImages[currentIndex])} alt="Demo" className={styles.modalImage} />
              <button className={styles.nextButton} onClick={nextSlide}>{">"}</button>
            </div>
            <div className={styles.pagination}>
              {demoImages.map((_, index) => (
                <span key={index} className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    demoImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
}