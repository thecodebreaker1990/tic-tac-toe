<script setup>
import { ref, onMounted } from 'vue'

function highlightDynamicPath() {
  const text = contentEditableDiv.value.textContent
  const dynamicPaths = text.match(dynamicPathRegex)

  if (dynamicPaths) {
    let highlightedText = text
    const sel = window.getSelection()
    let caretPos = sel.focusOffset

    for (let i = 0; i < dynamicPaths.length; i++) {
      const dynamicPath = dynamicPaths[i]
      const startIndex = highlightedText.indexOf(dynamicPath)
      const endIndex = startIndex + dynamicPath.length

      const id = `${startIndex}-${endIndex}`
      const highlightedContent = createHighlightedContent(dynamicPath, id)

      highlightedText =
        highlightedText.slice(0, startIndex) + highlightedContent + highlightedText.slice(endIndex)
      if (caretPos >= endIndex) {
        caretPos += highlightedContent.length - dynamicPath.length
      }
    }
    contentEditableDiv.value.innerHTML = highlightedText

    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      const newOffset = range.startOffset + caretPos - sel.focusOffset
      range.setStart(range.startContainer, newOffset)
      range.setEnd(range.startContainer, newOffset)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }
}

function createHighlightedContent(content, uniqueId) {
  const id = `highlight-${uniqueId}`
  return `<span class="highlight" id="${id}">${content}</span>`
}

// function restoreCaret() {
//   if (!editableTextContent.value) return

//   const selection = window.getSelection()
//   //if (selection.rangeCount === 0) return

//   const range = selection.getRangeAt(0)
//   //if (!editableTextContent.value.contains(range.startContainer)) return

//   //   const startOffset = range.startOffset
//   //   const newRange = document.createRange()

//   //   newRange.setStart(range.startContainer, startOffset)
//   //   newRange.setEnd(range.startContainer, startOffset)

//   //   selection.removeAllRanges()
//   //   selection.addRange(newRange)
// }

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
  max-height: 200px;
  font-size: 14px;
  margin: 16px 0;
  overflow-y: auto;
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
</style>
