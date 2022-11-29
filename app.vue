<template>
  <div
    w-screen
    h-screen
    fixed
    bg-yellow
    left-0
    top-0
    class="z--1"
    ref="container"
  >
    <div
      fixed
      p-x-3
      p-y-2
      left-0
      top-20px
      z-1
      cursor-pointer
      text-center
      all="bg-light-300 border rounded m-1 p-1 select-none overflow-hidden"
    >
      <div @click="clear" text-red>clear all</div>
      <div @click="deleteMode = !deleteMode">
        mode:
        <span :style="{ color: deleteMode ? 'red' : 'green' }">{{
          deleteMode ? 'delete' : 'add'
        }}</span>
      </div>

      <div flex justify-between>
        <label for="grid" min-w-50px>grid: {{ counter }}</label>
        <input
          type="range"
          id="grid"
          name="grid"
          v-model="counter"
          min="0"
          max="50"
        />
      </div>
      <div flex justify-between>
        <label for="color" min-w-50px>color: {{ color }}</label>
        <input
          type="range"
          id="color"
          name="color"
          v-model="color"
          min="0"
          max="50"
        />
      </div>
      <div flex justify-between>
        <div @click="styleCounter++">{{ '<-' }}</div>
        <div>{{ styles[Math.abs(styleCounter % styles.length)] }}</div>
        <div @click="styleCounter--">{{ '->' }}</div>
      </div>
      <div flex justify-between>
        <label for="blur" min-w-50px>blur: {{ blur }}</label>
        <input
          type="range"
          id="blur"
          name="blur"
          v-model="blur"
          min="0"
          max="10"
        />
      </div>
      <div @click="speedCounter++">
        speed: {{ speeds[speedCounter % speeds.length] }}
      </div>
      <div @click="rerender">sync</div>
    </div>
    <div class="grid" w-full h-full select-none>
      <div
        v-for="(n, index) in amount"
        @mouseover="hovered(index, 'hover')"
        @mousedown="hovered(index, 'click')"
        opacity-0
        class="aspect-1/1"
      ></div>
    </div>
    <div
      class="grid"
      fixed
      left-0
      top-0
      w-full
      h-full
      pointer-events-none
      :key="rerenderIndex"
    >
      <div
        border
        border-white
        rounded
        hover="opacity-100"
        v-for="(n, index) in hoveredArray"
        class="aspect-1/1"
        :class="[
          n
            ? `animate__animated animate__${
                speeds[speedCounter % speeds.length]
              } animate__${
                styles[Math.abs(styleCounter % styles.length)]
              } animate__infinite`
            : '',
        ]"
        :style="{
          backgroundColor: n ? 'black' : colors[color % 9],
          filter: `blur(${Math.abs(blur % 50)}px)`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import 'animate.css';
// create string array with 10 color
const range = ref(0);
const blur = ref(0);
const color = ref(0);
const speeds = ['slower', 'slow', 'fast', 'faster'];
const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#000000',
  '#ffffff',
];
const container = ref();
const rerenderIndex = ref(0);
const counter = ref(8);
const styleCounter = ref(0);
const speedCounter = ref(0);
const amount = ref(1000);
const deleteMode = ref(false);
const backgroundColor = useCssVar('--backgroundColor', container);
const cssCounter = useCssVar('--cssCounter', container);
const animateDuration = useCssVar('--animate-duration', container);
animateDuration.value = '1s';
cssCounter.value = counter.value;
watch(counter, () => (cssCounter.value = counter.value));
const styles = [
  'no animation',
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'backInDown',
  'backInLeft',
  'backInRight',
  'backInUp',
  'backOutDown',
  'backOutLeft',
  'backOutRight',
  'backOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'fadeOutTopLeft',
  'fadeOutTopRight',
  'fadeOutBottomRight',
  'fadeOutBottomLeft',
  'flip',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedInRight',
  'lightSpeedInLeft',
  'lightSpeedOutRight',
  'lightSpeedOutLeft',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
];
const { x, y, width, height } = useIax();
onMounted(() => console.log(width.value * height.value));
const hoveredArray = ref(new Array(amount.value).fill(false));
const { pressed } = useMousePressed();
// const arrayLength = computed(() => width.value * height.value)

// onMounted(() => {
// 	console.log(arrayLength.value)
// 	for (var i = 0; i < arrayLength.value; i++) {
// 		hoveredArray.value[i] = false
// 	}
// })
const hovered = (index, mode) => {
  if (pressed.value || mode === 'click') {
    if (deleteMode.value) hoveredArray.value[index] = false;
    else hoveredArray.value[index] = true;
  }
};
const rerender = () => rerenderIndex.value++;
const clear = () =>
  hoveredArray.value.forEach(
    (value, index) => (hoveredArray.value[index] = false)
  );
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(var(--cssCounter), minmax(0, 1fr));
}
</style>
