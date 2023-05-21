"use client";
import CommentsSection from "@/app/components/comments/CommentSection";
import BasicTabs from "@/app/components/Tabs/BasicTabs";
import { authAtom } from "@/app/state/atoms/atom";
import { CommentEntity, DefaultService, Subcategory } from "@/generated";
import { Box, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { Metadata } from "next";
import { Basic } from "next/font/google";
import { usePathname } from "next/navigation";
import { comment } from "postcss";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface Video {
  url: string;
}
// type Subcategory = { name: string; videos: Video[] };
type SubcategoryWithVideos = Omit<Subcategory, "videos"> & { videos: Video[] };

export default function SubcategoriesContent({ slugSub }: { slugSub: string }) {
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid item xs={12}>
        <Box
          margin="auto"
          marginTop={8}
          textAlign="left"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>{subcategorу?.name}</h1>
          <div>
            {subcategorу?.videos && subcategorу.videos.length > 0 && (
              <ReactPlayer
                url={subcategorу.videos[currentVideoIndex].url}
                width="80rem"
                height="60rem"
                controls
              />
            )}
          </div>
          <div>
            {subcategorу?.videos &&
              subcategorу.videos.map(
                (_video: { url: string }, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    style={{
                      margin: "5px",
                      backgroundColor:
                        currentVideoIndex === index ? "blue" : "white",
                    }}
                  >
                    Видео {index + 1}
                  </button>
                )
              )}
          </div>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <BasicTabs
          value={value}
          onChange={handleChange}
          tab1Content={
            <Typography variant="h4">{subcategorу?.description}</Typography>
          }
          tab2Content={
            <Typography sx={{ padding: 0 }}>
              {subcategorу?.comments && Array.isArray(subcategorу?.comments) ? (
                <CommentsSection
                  key={subcategorу.id}
                  comments={subcategorу.comments}
                  onNewReply={() => {}}
                  setComments={setComments}

                  //   setComments={setComments}
                />
              ) : (
                <div>No comments</div>
              )}
            </Typography>
          }
          tab3Content={<div>Шаблон документа</div>}
        />
      </Grid>
    </div>
  );
}
