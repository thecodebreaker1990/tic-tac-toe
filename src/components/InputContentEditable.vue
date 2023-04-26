<script setup>
import { ref, onMounted } from 'vue'

function highlightDynamicPath() {
  const text = contentEditableDiv.value.innerHTML

  const textNode = contentEditableDiv.value.childNodes[0]

  const dynamicPaths = text.match(dynamicPathRegex)

  if (dynamicPaths) {
    for (let i = 0; i < dynamicPaths.length; i++) {
      const dynamicPath = dynamicPaths[i]
      const startIndex = text.indexOf(dynamicPath)
      const endIndex = startIndex + dynamicPath.length

      //Create a range
      const range = document.createRange()
      range.setStart(textNode, startIndex) // Start at first character
      range.setEnd(textNode, endIndex) // End at fifth character

      //Create a new wrapper parent
      const newParent = document.createElement('span')
      newParent.className = 'highlight'
      newParent.id = `highlight-${startIndex}-${endIndex}`

      range.surroundContents(newParent)
    }
  }
}

function restoreCaret() {
  if (!editableTextContent.value) return

  const selection = window.getSelection()
  //if (selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  //if (!editableTextContent.value.contains(range.startContainer)) return

  console.log(selection, range)

  //   const startOffset = range.startOffset
  //   const newRange = document.createRange()

  //   newRange.setStart(range.startContainer, startOffset)
  //   newRange.setEnd(range.startContainer, startOffset)

  //   selection.removeAllRanges()
  //   selection.addRange(newRange)
}

function onInputChange() {
  editableTextContent.value = contentEditableDiv.value.textContent
  highlightDynamicPath()
}

const isEditable = true
const contentEditableDiv = ref(null)
const editableTextContent = ref('')
const dynamicPathRegex = /\$\{[^}]+\}|\$LIST\[[^\]]+\]|\$JSON\[[^\]]+\]/g

onMounted(() => {
  contentEditableDiv.value.innerHTML = editableTextContent.value
})
</script>

<template>
  <div>
    <label for="editable">Enter Dynamic Path</label>
    <div
      id="editable"
      ref="contentEditableDiv"
      class="input"
      :contenteditable="isEditable"
      @input="onInputChange"
      @blur="restoreCaret"
    ></div>
    <button @click="highlightDynamicPath">Highlight Text</button>
  </div>
</template>

<style>
.input {
  display: block;
  background-color: white;
  border: solid 1px #999;
  border-radius: 6px;
  padding: 10px;
  width: 500px;
  height: 45px;
  font-size: 14px;
  margin: 16px 0;
}
.input:focus {
  outline: none;
  border: solid 1px blue;
}
.highlight {
  background-color: #fff38b;
  border-radius: 4px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); */
  color: #333;
  font-weight: bold;
  padding: 2px 4px;
  /* caret-color: red; */
}
/* [contenteditable]:not(.highlight)::selection {
  background-color: transparent;
  caret-color: auto;
} */
</style>
