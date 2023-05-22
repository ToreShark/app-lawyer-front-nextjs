"use client";
import CommentsSection from "@/app/components/comments/CommentSection";
import BasicTabs from "@/app/components/Tabs/BasicTabs";
import { authAtom } from "@/app/state/atoms/atom";
import { CommentEntity, DefaultService, Subcategory } from "@/generated";
import { Box, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Video {
  url: string;
}
// type Subcategory = { name: string; videos: Video[] };
type SubcategoryWithVideos = Omit<Subcategory, "videos"> & { videos: Video[] };

export default function SubcategoriesContent() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const [subcategorу, setSubcategory] = useState<SubcategoryWithVideos | null>(
    null
  );
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [value, setValue] = useState(0);
  const setComments = useCallback((newComments: CommentEntity[]) => {
    setSubcategory((prevSubcategory) => {
      if (prevSubcategory) {
        return { ...prevSubcategory, comments: newComments };
      } else {
        return prevSubcategory;
      }
    });
  }, []);
  const [auth, setAuth] = useAtom(authAtom);
  const [isDayMode, setIsDayMode] = useState(false);


  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setAuth({
      isAuthenticated: Boolean(accessToken),
      authToken: accessToken || "",
      refreshToken: refreshToken || "",
      userId: "",
    });
  }, [setAuth]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      console.log("Вы не авторизованы");
    }
  }, [auth]);

  useEffect(() => {
    if (slug) {
      DefaultService.subcategoriesControllerFindBySlug(slug)
        .then((subcategory: Subcategory) => {
          console.log("subcategory", subcategory);
          if (subcategory && subcategory.name) {
            const videos = subcategory.videos.every((video) =>
              video.hasOwnProperty("url")
            )
              ? subcategory.videos
              : [];
            setSubcategory({
              ...subcategory,
              videos: videos.map((video) => ({ url: video.url })),
            });
          }
        })
        .catch((error) => console.error(error));
    }
  }, [slug]);

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");

    const updateDayMode = () => {
      setIsDayMode(!matcher.matches);
    };

    // Установите режим при первоначальной загрузке
    updateDayMode();

    // Добавьте слушатель для отслеживания изменений
    matcher.addListener(updateDayMode);

    // Очистите слушатель при размонтировании компонента
    return () => {
      matcher.removeListener(updateDayMode);
    };
  }, []);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      {auth.isAuthenticated ? (
      <><Grid item xs={12}>
          <Box
            margin="auto"
            marginTop={8}
            textAlign="left"
            maxWidth="100rem"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1>{subcategorу?.name}</h1>
            <div className="aspect-w-16 aspect-h-9 w-full lg:w-[50rem] h-[30rem] md:h-[40rem] sm:h-[20rem] lg:h-[50rem] max-h-screen">
              {subcategorу?.videos && subcategorу.videos.length > 0 && (
                <ReactPlayer
                  url={subcategorу.videos[currentVideoIndex].url}
                  width="100%"
                  height="100%"
                  controls />
              )}
            </div>
            <div>
              {subcategorу?.videos &&
                subcategorу.videos.map(
                  (_video: { url: string; }, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      style={{
                        margin: "5px",
                        backgroundColor: currentVideoIndex === index ? "blue" : "white",
                      }}
                    >
                      Видео {index + 1}
                    </button>
                  )
                )}
            </div>
          </Box>
        </Grid><Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
            <BasicTabs
              value={value}
              onChange={handleChange}
              tab1Content={<Typography variant="h4">{subcategorу?.description}</Typography>}
              tab2Content={<Typography sx={{ padding: 0, color: isDayMode ? 'black' : 'white' }}>
                {subcategorу?.comments && Array.isArray(subcategorу?.comments) ? (
                  <CommentsSection
                    key={subcategorу.id}
                    comments={subcategorу.comments}
                    onNewReply={() => { } }
                    setComments={setComments} />
                ) : (
                  <div className={`color: isDayMode ? 'black' : 'white' `}>No comments</div>
                )}
              </Typography>}
              tab3Content={<div>Шаблон документа</div>} />
          </Grid></>
      ) : (
        <Grid item xs={12}>
          <Box
            margin="auto"
            marginTop={8}
            textAlign="center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">
              Пожалуйста, войдите или зарегистрируйтесь, чтобы просматривать этот контент
            </Typography>
          </Box>
        </Grid>
      )}
    </div>
  );
}
