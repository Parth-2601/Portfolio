import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

const TAB_DATA = [
  {
    title: "Education",
    id: "education",
    content: [
      {
        degree: "Advanced Diploma in Computer Programming",
        institution: "George Brown College (Sept, 2022 - Apr, 2025)",
      },
    ],
  },
  {
    title: "Certifications",
    id: "certifications",
    content: [],
  },
];

const TabButton = ({ active, selectTab, children }) => {
  return (
    <button
      onClick={selectTab}
      className={`${styles.tabButton} ${active ? styles.activeTab : ""}`}
    >
      {children}
    </button>
  );
};

export const About = () => {
  const [tab, setTab] = useState("education");

  const handleTabChange = (id) => {
    console.log(`Switching to tab: ${id}`);
    setTab(id);
  };

  const activeTab = TAB_DATA.find((t) => t.id === tab);
  console.log("Active Tab Data:", activeTab);

  return (
    <section className={styles.container} id="about">
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <img
            src={getImageUrl("about/aboutImage.png")}
            alt="Man sitting with a laptop"
            className={styles.aboutImage}
          />
        </div>
        <div className={styles.rightColumn}>
        <h2 className={styles.title}>About</h2>
          <p className={styles.aboutText}>
            I am a full-stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git.
            <br></br>
            <br></br>
            With a deep interest in problem-solving and software architecture, I
            enjoy designing efficient and scalable solutions. My goal is to
            develop web applications that are both visually appealing and highly
            functional, ensuring an intuitive user experience.
          </p>
          <div className={styles.tabButtons}>
            {TAB_DATA.map((t) => (
              <TabButton
                key={t.id}
                selectTab={() => handleTabChange(t.id)}
                active={tab === t.id}
              >
                {t.title}
              </TabButton>
            ))}
          </div>
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.tabContent}
          >
            {activeTab?.content.length > 0 ? (
              <ul className={styles.list}>
                {activeTab.content.map((item, index) =>
                  typeof item === "object" ? (
                    <li key={index}>
                      <strong>{item.degree}</strong>
                      <br />
                      {item.institution}
                    </li>
                  ) : (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            ) : (
              <p>No {activeTab?.title} available to show</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
