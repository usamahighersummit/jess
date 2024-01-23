import * as React from "react";
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

const drawerWidth = 240;

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
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleQuizClick = (quiz) => {
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
        handleQuizValue(res.data.quiz_question_list);
        handleQuizTotalMarks(quiz.quiz_marks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {quizzesData.map((quiz, index) => (
            <ListItem key={quiz.student_quiz_id} disablePadding>
              <ListItemButton onClick={() => handleQuizClick(quiz)}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={quiz.student_quiz_title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div className="flex justify-center mt-[10%] ">
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
          />
        </div>
      </Main>
    </Box>
  );
}
