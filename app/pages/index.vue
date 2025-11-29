<template>
  <div class="dark" style="text-align:center; margin:3rem;">
    <div class="container mx-auto px-4">
      <div class="container">
        <h1 class="title">
          Twitter Search Commands Tool
        </h1>

        <div class="form-group mx-auto my-4">
          <h2 class="subtitle mb-2">Conditions</h2>
          <!-- Twitter Account ID Input Field -->
            <div id="account-id" class="mb-4">
            <label for="accountId" class="block text-sm font-medium mb-1">Twitter Account ID (Numeric)</label>
            <input
              type="text"
              id="accountId"
              v-model="accountId"
              @input="handleInput(accountId)"
              class="p-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-full border border-gray-300 rounded transition-all duration-150"
              placeholder="e.g., 44196397 for @elonmusk"
              autocomplete="off"
              spellcheck="false"
              autocapitalize="off"
              name="accountId"
              data-form="search-params"
              data-type="social-id"
            />
            </div>

          <!-- Keywords Input Field -->
          <div id="keywords-group" class="mx-auto mb-4">
            <label for="keywords" class="block text-sm font-medium mb-1">Keywords</label>
            <input 
              type="text" 
              id="keywords" 
              v-model="keywords" 
              @input="handleInput(keywords)" 
              class="p-2 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-full border border-gray-300 rounded transition-all duration-150"
              placeholder="e.g., AI, technology" 
              autocomplete="off" 
              spellcheck="false"
              autocapitalize="off" 
              name="keywords" 
              data-form="search-params" 
              data-type="search-terms" 
              />
          </div>

          <!-- Date Input Field -->
          <div id="date-from" class="mx-auto mb-4">
            <label for="date" class="block text-sm font-medium mb-1">Date</label>
            <input type="date" id="date" v-model="dateFrom" @input="handleInput(dateFrom)" class="p-2 w-smd
              border border-gray-300 rounded" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="dateFrom" />
            ～
            <input type="date" id="dateTo" v-model="dateTo" @input="handleInput(dateTo)" class="p-2 w-smd
              border border-gray-300 rounded" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="dateTo" />
          </div>

          <!-- Favorites Input Field -->
          <div id="favorites" class="mb-4">
            <label for="favorites" class="block text-sm font-medium mb-1">Favorites</label>
            <input type="number" id="favorite-min" v-model="favoriteMin" @input="handleInput(favoriteMin)" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: 0" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="favoriteMin" />
            ～
            <input type="number" id="favorite-max" v-model="favoriteMax" @input="handleInput(favoriteMax)" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: +inf" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="favoriteMax" />
          </div>

          <!-- Retweets Input Field -->
          <div id="retweets" class="mb-4">
            <label for="retweets" class="block text-sm font-medium mb-1">Retweets</label>
            <input type="number" id="retweet-min" v-model="retweetMin" @input="handleInput(retweetMin)" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: 0" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="retweetMin" />
            ～
            <input type="number" id="retweet-max" v-model="retweetMax" @input="handleInput(retweetMax)" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: +inf" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="retweetMax" />
          </div>

          <!-- Replies Input Field -->
          <div id="replies" class="mb-4">
            <label for="replies" class="block text-sm font-medium mb-1">Replies</label>
            <input type="number" id="reply-min" v-model="replyMin" @input="handleInput(replyMin)" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: 0" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="replyMin" />
            ～
            <input type="number" id="reply-max" v-model="replyMax" @input="handleInput(replyMax)" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: +inf" autocomplete="off" spellcheck="false"
              autocapitalize="off" name="replyMax" />
          </div>

          <div class="button-container my-4">
            <button id="generateBtn" type="button" @click="generateCommand()"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Generate Search Command
            </button>
          </div>
        </div>

        <div class="search-result mx-auto my-4 p-4">
          <h2 class="subtitle mb-2">Search Command Result</h2>
          <textarea id="result" :value="result" @input="result = $event.target.value" class="w-full h-32 p-2 border border-gray-300 rounded"
            autocomplete="off" spellcheck="false" autocapitalize="off" name="result" readonly role="textbox" aria-label="Generated search command"></textarea>
          
            <div class="note mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <p class="text-sm">
              Note: This tool generates Twitter search commands based on the specified conditions.
              Please copy the generated command and use it in Twitter's search bar to see the results.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="text-center p-4">
    <p class="text-sm text-gray-500">(C) 2025 huraicid. All rights reserved.</p>
  </footer>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue';

export default {
  setup() {
    // reactive form state
    const accountId = ref('');
    const keywords = ref('');
    const dateFrom = ref('');
    const dateTo = ref('');
    const favoriteMin = ref('');
    const favoriteMax = ref('');
    const retweetMin = ref('');
    const retweetMax = ref('');
    const replyMin = ref('');
    const replyMax = ref('');
    const result = ref('');

    // ブラウザ拡張機能との競合を避けるために、DOM更新後に少し待つ
    const updateValue = (refObj, value) => {
      try {
        if (refObj && refObj.value !== undefined) {
          refObj.value = value;
        }
      } catch (error) {
        console.warn('Error updating value:', error);
      }
    };

    // より安全なイベントハンドラー
    const handleInput = (refObj) => {
      return (event) => {
        try {
          if (event && event.target) {
            updateValue(refObj, event.target.value);
          }
        } catch (error) {
          console.warn('Error handling input:', error);
        }
      };
    };

    const generateCommand = () => {
      const commandParts = [];

      // Account ID
      const acc = typeof accountId.value === 'string' ? accountId.value.trim() : '';
      if (acc) commandParts.push(`from:${acc.replace(/@/g, '')}`);

      // Keywords
      const kw = typeof keywords.value === 'string' ? keywords.value.trim() : '';
      if (kw) commandParts.push(`"${kw}"`);

      // Date Range
      if (dateFrom.value) commandParts.push(`since:${dateFrom.value}`);
      if (dateTo.value) commandParts.push(`until:${dateTo.value}`);

      // Favorites
      if (favoriteMin.value !== '') {
        let min = parseInt(favoriteMin.value, 10);
        if (isNaN(min) || min < 0) min = 0;
        commandParts.push(`min_faves:${min}`);
      }
      if (favoriteMax.value !== '') { 
        let max = parseInt(favoriteMax.value, 10);
        if (isNaN(max) || max < 0) max = 0;
        commandParts.push(`max_faves:${max}`);
      }

      // Retweets
      if (retweetMin.value !== '') {
        let min = parseInt(retweetMin.value, 10);
        if (isNaN(min) || min < 0) min = 0;
        commandParts.push(`min_retweets:${min}`);
      }
      if (retweetMax.value !== '') {  
        let max = parseInt(retweetMax.value, 10);
        if (isNaN(max) || max < 0) max = 0;
        commandParts.push(`max_retweets:${max}`);
      }

      // Replies
      if (replyMin.value !== '') {
        let min = parseInt(replyMin.value, 10);
        if (isNaN(min) || min < 0) min = 0;
        commandParts.push(`min_replies:${min}`);
      }
      if (replyMax.value !== '') {
        let max = parseInt(replyMax.value, 10);
        if (isNaN(max) || max < 0) max = 0;
        commandParts.push(`max_replies:${max}`);
      }

      updateValue(result, commandParts.join(' '));
    };

    // コンポーネントマウント後にフォームを安定化
    onMounted(() => {
      nextTick(() => {
        // ブラウザ拡張機能がDOMを認識する時間を確保
        console.log('Form initialized');
      });
    });

    return {
      accountId,
      keywords,
      dateFrom,
      dateTo,
      favoriteMin,
      favoriteMax,
      retweetMin,
      retweetMax,
      replyMin,
      replyMax,
      result,
      generateCommand,
      updateValue,
      handleInput,
    };
  },
};
</script>