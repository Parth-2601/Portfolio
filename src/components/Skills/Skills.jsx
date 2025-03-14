// Skills.js
import styles from "./Skills.module.css";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";

export const Skills = () => {
  console.log("Skills data:", skills); // Debugging: Check the data

  return (
    <section className={styles.container} id="skills" aria-label="Skills Section">
      <h2 className={styles.title}>My Skills</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill) => {
            const imageUrl = getImageUrl(skill.imageSrc);
            console.log("Image URL:", imageUrl); // Debugging: Check the URL
            return (
              <div key={skill.id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img
                    src={imageUrl}
                    alt={skill.title ? skill.title + " icon" : "Skill icon"}
                    loading="lazy"
                  />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
