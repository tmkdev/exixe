/*
  exixe modules:
  https://github.com/dekuNukem/exixe

  library docs:
  https://github.com/dekuNukem/exixe/tree/master/arduino_library

  Demo 3: Loop digits with crossfade animation
*/

#define RAINBOW_COLORS 6

#include "exixe.h"

// change this to the cs pin you're using
int cs_pin = 10;
unsigned char count;
exixe my_tube = exixe(cs_pin);

unsigned char cl_red[RAINBOW_COLORS] = {148, 0, 0, 255, 255, 255};
unsigned char cl_green[RAINBOW_COLORS] = {0, 0, 255, 255, 127, 0};
unsigned char cl_blue[RAINBOW_COLORS] = {211, 255, 0, 0, 0, 0};

void setup()
{
  my_tube.spi_init();
  my_tube.clear();
}

void loop()
{
  count = (count + 1) % RAINBOW_COLORS;
  /*
  1st arg: Digit to show, 0 to 9
  2nd arg: how many frames does crossfade last, 30 frames = 1 second
  3rd arg: digit brightness, 0 to 127
  4th arg: overdrive, 0 disable 1 enable

  This function sets up the crossfade animation
  call crossfade_run() to actually start it
  */
  my_tube.crossfade_init(count, 15, 127, 0, cl_red[count]/2, cl_green[count]/2, cl_blue[count]/2);

  // crossfade_run() is non-blocking and returns right away
  // call it regularly(at least every 33ms) for a smooth animation
  // check its return value to see if the animation is finished
  while(my_tube.crossfade_run() == EXIXE_ANIMATION_IN_PROGRESS)
    ;

  delay(250);
}