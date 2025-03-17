import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Hello, I'm <br />
          <TypeAnimation
            sequence={[
              "PARTHKUMAR",
              1000,
              "A FULL-STACK DEVELOPER",
              1000,
              "UI/UX DESIGNER",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className={styles.description}>
          I'm a dedicated full-stack developer with expertise in building
          scalable and efficient web applications using React, Node.js, and
          modern development tools. I am passionate about creating seamless user
          experiences and optimizing backend performance. Feel free to connect
          with me to discuss potential collaborations or opportunities.
        </p>
        <div className={styles.buttonContainer}>
          <a
            href="https://drive.google.com/file/d/1qvPluWkPrTei2nDO6eTGXsPb8LDk9yp3/view?usp=drive_link"
            className={styles.downloadBtn}
            download
          >
            <span>Resume</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1W3AZOZcVpLbugTZSsvusbSWCZlHU_mLU/view?usp=drive_link"
            className={styles.downloadBtn}
            download
          >
            <span>Cover Letter</span>
          </a>
        </div>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Professional portrait"
        className={styles.heroImg}
      />
      <div className={styles.firstBlur} />
      <div className={styles.secondBlur} />
    </section>
  );
};
