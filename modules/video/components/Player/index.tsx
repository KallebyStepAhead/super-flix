import React, {
  KeyboardEvent, useRef, useState,
} from 'react';
import {
  IconButton, Slider,
  Box, Container, HStack,
  SliderFilledTrack, SliderThumb, SliderTrack, Text, Tooltip,
} from '@chakra-ui/react';
import {
  FiMaximize2, FiMinimize2, FiPause, FiPlay, FiVolume2, FiVolumeX,
} from 'react-icons/fi';
import { parseDurationToTimeString } from '../../../../shared/helpers/timeStringParser';
import { MediaAsset } from '../../schemas/video';

type PlayerProps = {
  media: MediaAsset
}

type KeyMap = {
  [name: string]: Function
}

type VideoEvent = React.SyntheticEvent<HTMLVideoElement, Event>

export function Player({ media }: PlayerProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleCanPlay({ currentTarget }: VideoEvent) {
    setDuration(currentTarget.duration);
  }

  function handleTimeUpdate(e: VideoEvent) {
    const time = e.currentTarget.currentTime;
    setCurrentTime(time);
    setTimeProgress((time / duration) * 100);
  }

  function handleTimeChange(value: number) {
    if (!videoRef.current) return;

    const time = (value / 100) * duration;

    videoRef.current.currentTime = time;

    setCurrentTime(time);
    setTimeProgress(value);
  }

  async function handlePlayChange() {
    if (!videoRef.current) return;

    isPlaying
      ? videoRef.current.pause()
      : videoRef.current.play();
  }

  function handleFullScreenChange() {
    if (!playerRef.current) return;

    const fullScreenState = !isFullScreen;

    fullScreenState
      ? playerRef.current.requestFullscreen()
      : document.exitFullscreen();

    setIsFullScreen(fullScreenState);
  }

  function handleMuteChange() {
    if (!videoRef.current) return;

    const muteState = !isMuted;

    videoRef.current.muted = muteState;

    setIsMuted(muteState);
  }

  const keyMap: KeyMap = {
    KeyF: handleFullScreenChange,
    KeyM: handleMuteChange,
    Space: handlePlayChange,
  };

  function handleKeyPress(event: KeyboardEvent<HTMLVideoElement>) {
    const { code } = event;

    const keyMethod = keyMap[code];

    if (!keyMethod) return;

    keyMethod();
  }

  return (
    <Box
      ref={playerRef}
      position="relative"
    >
      <video
        width="100%"
        ref={videoRef}
        onCanPlay={handleCanPlay}
        onClick={handlePlayChange}
        onDoubleClick={handleFullScreenChange}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onKeyPress={handleKeyPress}
      >
        <track kind="captions" />
        <source src={media.url} type={media.mimetype} />
      </video>

      <Container
        p={4}
        maxW="full"
        bottom={0}
        position="absolute"
      >
        <HStack
          p={2}
          w="full"
          gap={4}
          rounded="md"
          alignItems="center"
          bgColor="blackAlpha.600"
        >
          <Tooltip
            hasArrow
            placement="top"
            label={`${isPlaying ? 'pause' : 'play'} (space)`}
          >
            <IconButton
              size="sm"
              rounded="full"
              cursor="pointer"
              onClick={handlePlayChange}
              aria-label={isPlaying ? 'pause' : 'play'}
              icon={isPlaying ? <FiPause /> : <FiPlay />}
              title={isFullScreen ? `${isPlaying ? 'pause' : 'play'} (space)` : ''}
            />
          </Tooltip>

          <Slider
            value={timeProgress}
            onChange={handleTimeChange}
            focusThumbOnChange={false}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              placement="top"
              label={parseDurationToTimeString(currentTime)}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>

          <Tooltip
            hasArrow
            placement="top"
            label={`${isMuted ? 'unmute' : 'mute'} (m)`}
          >
            <IconButton
              size="sm"
              rounded="full"
              cursor="pointer"
              onClick={handleMuteChange}
              aria-label={isMuted ? 'unmute' : 'mute'}
              title={isFullScreen ? `${isMuted ? 'unmute' : 'mute'} (m)` : ''}
              icon={isMuted ? <FiVolumeX /> : <FiVolume2 />}
            />
          </Tooltip>

          <HStack>
            <Text>{parseDurationToTimeString(currentTime)}</Text>
            <Text>/</Text>
            <Text>{parseDurationToTimeString(duration)}</Text>
          </HStack>

          <Tooltip
            hasArrow
            placement="top"
            label={`${isFullScreen ? 'minimize' : 'full-screen'} (f)`}
          >
            <IconButton
              size="sm"
              rounded="full"
              cursor="pointer"
              onClick={handleFullScreenChange}
              aria-label={isFullScreen ? 'minimize' : 'full-screen'}
              title={isFullScreen ? 'minimize (f)' : ''}
              icon={isFullScreen ? <FiMinimize2 /> : <FiMaximize2 />}
            />
          </Tooltip>
        </HStack>
      </Container>
    </Box>
  );
}
