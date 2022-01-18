import React, {
  KeyboardEvent, useEffect, useRef, useState,
} from 'react';
import {
  Progress,
  IconButton, Slider,
  Box, Container, HStack,
  SliderFilledTrack, SliderThumb,
  SliderTrack, Text, Tooltip, Popover,
  PopoverTrigger, PopoverArrow, PopoverBody,
  PopoverContent,
} from '@chakra-ui/react';
import {
  FiMaximize2, FiMinimize2, FiPause, FiPlay, FiVolume, FiVolume1, FiVolume2, FiVolumeX,
} from 'react-icons/fi';
import { parseDurationToTimeString } from '../../../../shared/helpers/timeStringParser';
import { MediaAsset, VideoAsset } from '../../schemas/video';

type PlayerProps = {
  media: MediaAsset
  poster?: VideoAsset
}

type KeyMap = {
  [name: string]: Function
}

type VideoEvent = React.SyntheticEvent<HTMLVideoElement, Event>

export function Player({ media, poster }: PlayerProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [audioVolume, setAudioVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current
      .addEventListener('fullscreenchange', () => setIsFullScreen(!!document.fullscreenElement));
  }, []);

  const volumeIcon = ((audioVolume === 0) && <FiVolumeX />)
    || ((audioVolume > 0 && audioVolume <= 0.25) && <FiVolume />)
    || ((audioVolume > 0.25 && audioVolume <= 0.5) && <FiVolume1 />)
    || (<FiVolume2 />);

  function handleCanPlay({ currentTarget }: VideoEvent) {
    setDuration(currentTarget.duration);
  }

  function handleProgress({ currentTarget }: VideoEvent) {
    let range = 0;
    const buffer = currentTarget.buffered;
    const time = currentTarget.currentTime;

    try {
      while (!(buffer.start(range) <= time && time <= buffer.end(range))) {
        range += 1;
      }
    // eslint-disable-next-line no-empty
    } catch {}

    const loadStart = buffer.start(range) / duration;
    const loadEnd = buffer.end(range) / duration;

    const loadPercentage = (loadEnd - loadStart) * 100;
    setLoadProgress(loadPercentage);
  }

  function handleTimeUpdate(e: VideoEvent) {
    const time = e.currentTarget.currentTime;
    setCurrentTime(time);
    setTimeProgress((time / duration) * 100);

    handleProgress(e);
  }

  function handleTimeChange(value: number) {
    if (!videoRef.current) return;

    const time = (value / 100) * duration;

    videoRef.current.currentTime = time;

    setCurrentTime(time);
    setTimeProgress(value);
  }

  function handleVolumeChange(value: number) {
    if (!videoRef.current) return;

    if (value > 0) {
      videoRef.current.muted = false;
    }

    videoRef.current.volume = value;
    setAudioVolume(value);
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

    const muteState = audioVolume > 0;

    videoRef.current.muted = muteState;
    setAudioVolume(muteState ? 0 : 1);
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
        ref={videoRef}
        poster={poster?.url}
        onCanPlay={handleCanPlay}
        onPlay={(e) => !duration && handleCanPlay(e)}
        onClick={handlePlayChange}
        onDoubleClick={handleFullScreenChange}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onKeyPress={handleKeyPress}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
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
            colorScheme="facebook"
            position="relative"
          >
            <SliderTrack>
              <Progress
                w="full"
                position="absolute"
                colorScheme="whiteAlpha"
                value={loadProgress + timeProgress}
              />
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

          <Popover>
            <PopoverTrigger>
              <IconButton
                size="sm"
                rounded="full"
                cursor="pointer"
                aria-label={`volume: ${audioVolume * 100} %`}
                title={isFullScreen ? `volume: ${audioVolume * 100} %` : ''}
                icon={volumeIcon}
              />
            </PopoverTrigger>

            <PopoverContent
              maxW="10"
              py={2}
            >
              <PopoverArrow />
              <PopoverBody>
                <Slider
                  minH="32"
                  max={1}
                  min={0}
                  step={0.01}
                  colorScheme="facebook"
                  orientation="vertical"
                  aria-label="volume-control"
                  value={audioVolume}
                  onChange={handleVolumeChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>

                  <SliderThumb />
                </Slider>
              </PopoverBody>
            </PopoverContent>
          </Popover>

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
