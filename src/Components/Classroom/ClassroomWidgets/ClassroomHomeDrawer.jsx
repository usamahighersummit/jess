import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QuizCard from "./QuizCard";
import axios from "axios";
import { SidebarTopicAccordian } from "./SidebarAccordians/SidebarTopicAccordian";
import LessonCard from "./LessonCard";
import DrawerIcon from "../../../images/drawer.png";

const drawerWidth = 340;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function ClassroomHomeDrawer({
  quizzesData,
  handleQuizValue,
  quizData,
  selectedQuizQuestionIterationIndex,
  handleIterationIndex,
  selectedAnswerIndex,
  handleSelectedAnswer,
  isSubmitted,
  handleSubmittedStatus,
  quizCompleted,
  quizScore,
  handleQuizMarks,
  quizTotalMarks,
  handleQuizTotalMarks,
  sidebarData,
  classId,
  attemptedQuiz,
  selectedQuiz,
  setSelectedQuiz,
  submitQuiz,
  handleNewQuizState,
  getSidebarData,
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [quizOrLesson, setQuizOrLesson] = React.useState(-1);
  const [lessonResponseData, setLessonResponseData] = React.useState();
  const [selectedResponseButtons, setSelectedResponseButtons] = React.useState(
    []
  );
  const [lessondata, setLessonData] = useState([]);
  const [selectedIndexQuizOrLesson, setSelectedIndexQuizOrLesson] =
    useState("");
  const [hoverIndexQuizOrLesson, setHoverIndexQuizOrLesson] = useState("");
  const [openAccordian, setOpenAccordian] = React.useState(null);
  const [openSubtopicAccordian, setOpenSubtopicAccordian] = React.useState(0);
  const [firstIteration, setFirstIteration] = useState(false);

  const handleOnClick = (data, type) => {
    if (type === 1) {
      handleLessonClick(data);
    } else {
      handleQuizClick(data);
    }
  };

  const onMouseEnter = (index) => {
    setHoverIndexQuizOrLesson(index);
  };
  const onMouseLeave = () => {
    setHoverIndexQuizOrLesson(-1);
  };

  const handleSelectedIndex = (index, data, type) => {
    window.speechSynthesis.cancel();
    console.log("INDEX IS: ", index);
    setSelectedIndexQuizOrLesson(index);
    handleOnClick(data, type);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleQuizClick = (quiz) => {
    if (selectedQuiz) {
      if (selectedQuiz.student_quiz_id === quiz.student_quiz_id) {
        return;
      }
    }
    setSelectedQuiz(quiz);
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post["authorization"] = token;
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/student_get_quiz", {
        method: "POST",
        student_quiz_id: quiz.student_quiz_id,
      })
      .then((res) => {
        console.log("Quiz: ", res.data);
        setQuizOrLesson(0);
        handleQuizValue(res.data.quiz_question_list);
        handleQuizTotalMarks(quiz.quiz_marks);
        handleNewQuizState();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLessonClick = (lesson) => {
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post["authorization"] = token;
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/get_lesson_for_user", {
        method: "POST",
        lesson_key: lesson.lesson_key,
      })
      .then((res) => {
        setQuizOrLesson(1);
        setLessonData(res.data.lesson_data);
        setSelectedQuiz(null);
        console.log("DATA", res.data.lesson_data[0].page_list);
        setLessonResponseData(res.data.lesson_data[0].page_list);
        setSelectedResponseButtons(
          res.data.lesson_data[0].page_list[0].options_list
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!firstIteration) {
      if (sidebarData) {
        for (
          let topicIndex = 0;
          topicIndex < sidebarData.topic_list.length;
          topicIndex++
        ) {
          const topic = sidebarData.topic_list[topicIndex];
          for (
            let subtopicIndex = 0;
            subtopicIndex < topic.sub_topic_list.length;
            subtopicIndex++
          ) {
            const subtopic = topic.sub_topic_list[subtopicIndex];
            for (
              let lessonIndex = 0;
              lessonIndex < subtopic.lesson_list.length;
              lessonIndex++
            ) {
              const lesson = subtopic.lesson_list[lessonIndex];
              if (lesson.lesson_state === 0) {
                handleLessonClick(lesson);
                setOpenAccordian(topicIndex);
                handleSelectedIndex(lesson.lesson_key, lesson, 1);
                setOpenSubtopicAccordian(subtopicIndex);
                setFirstIteration(true);
                return;
              }
            }
            if (quizOrLesson === -1) {
              for (
                let quizIndex = 0;
                quizIndex < subtopic.quizzes_list.length;
                quizIndex++
              ) {
                const quiz = subtopic.quizzes_list[quizIndex];
                if (quiz.quiz_state === 0) {
                  handleQuizClick(quiz);
                  setOpenAccordian(topicIndex);
                  handleSelectedIndex(quiz.student_quiz_id, quiz, 2);
                  setOpenSubtopicAccordian(subtopicIndex);
                  setFirstIteration(true);
                  return;
                }
              }
            }
          }
        }
      }
    }
  }, [sidebarData]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: "#403151" }}>
        <Toolbar style={{ background: "#403151" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {/* Persistent drawer */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#403151",
            borderRight: "0.5px solid white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          style={{
            background: "#403151",
            minHeight: "17vh",
            justifyContent: "start",
            alignItems: "start",
            padding: "7%",
            position: "sticky",
            top: "0px",
            zIndex: "1000",
          }}
        >
          <div>
            <button className="flex w-[100%]" onClick={handleDrawerClose}>
              <img src={DrawerIcon} style={{ objectFit: "contain" }} />
            </button>
            <div
              className="mt-[20%]"
              style={{
                fontFamily: "roboto",
                fontSize: "20px",
                lineHeight: "24px",
                color: "white",
              }}
            >
              {sidebarData && sidebarData.class_data.classroom_name}
            </div>
          </div>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "white" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <List style={{ background: "#403151" }}>
          {sidebarData &&
            sidebarData.topic_list.map((topic, index) => (
              <>
                <SidebarTopicAccordian
                  topic={topic}
                  topicIndex={index}
                  handleLessonClick={handleLessonClick}
                  handleQuizClick={handleQuizClick}
                  selectedIndexQuizOrLesson={selectedIndexQuizOrLesson}
                  hoverIndexQuizOrLesson={hoverIndexQuizOrLesson}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  handleSelectedIndex={handleSelectedIndex}
                  open={openAccordian}
                  setOpen={setOpenAccordian}
                  openSubtopicAccordian={openSubtopicAccordian}
                  setOpenSubtopicAccordian={setOpenSubtopicAccordian}
                />
                <hr className="mt-0 mb-0" style={{ color: "white" }}></hr>
              </>
            ))}

          {/* {quizzesData.map((quiz, index) => (
            <ListItem key={quiz.student_quiz_id} disablePadding>
              <ListItemButton onClick={() => handleQuizClick(quiz)}>
                <ListItemIcon></ListItemIcon>
                <ListItemText
                  primary={quiz.student_quiz_title}
                  style={{ color: "white" }}
                />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
        <Divider />
      </Drawer>
      <Main open={open} style={{ padding: "0px" }}>
        <DrawerHeader />
        <div
          className={
            quizOrLesson === 0 && "flex justify-center items-center h-[90vh] "
          }
        >
          {quizOrLesson === 1 ? (
            <LessonCard
              lessonResponseData={lessonResponseData}
              selectedResponseButtons={selectedResponseButtons}
              setSelectedResponseButtons={setSelectedResponseButtons}
              classId={classId}
              lessondata={lessondata}
              getSidebarData={getSidebarData}
            />
          ) : (
            quizOrLesson === 0 && (
              <QuizCard
                quizData={quizData}
                selectedQuizQuestionIterationIndex={
                  selectedQuizQuestionIterationIndex
                }
                handleIterationIndex={handleIterationIndex}
                selectedAnswerIndex={selectedAnswerIndex}
                handleSelectedAnswer={handleSelectedAnswer}
                isSubmitted={isSubmitted}
                handleSubmittedStatus={handleSubmittedStatus}
                quizCompleted={quizCompleted}
                quizScore={quizScore}
                handleQuizMarks={handleQuizMarks}
                quizTotalMarks={quizTotalMarks}
                submitQuiz={submitQuiz}
              />
            )
          )}
        </div>
      </Main>
    </Box>
  );
}
