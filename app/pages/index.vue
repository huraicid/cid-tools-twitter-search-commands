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
            <input type="text" id="accountId" v-model="accountId" class="p-2 w-md
              border border-gray-300 rounded" placeholder="e.g., 44196397 for @elonmusk" autocomplete="off"
              spellcheck="false" data-gramm="false" autocapitalize="off" />
          </div>

          <!-- Keywords Input Field -->
          <div id="keywords-group" class="mb-4">
            <label for="keywords" class="block text-sm font-medium mb-1">Keywords</label>
            <input type="text" id="keywords" v-model="keywords" class="p-2 w-md
              border border-gray-300 rounded" placeholder="e.g., AI, technology" autocomplete="off" spellcheck="false"
              data-gramm="false" autocapitalize="off" />
          </div>

          <!-- Date Input Field -->
          <div id="date-from" class="mb-4">
            <label for="date" class="block text-sm font-medium mb-1">Date</label>
            <input type="date" id="date" v-model="dateFrom" class="p-2 w-smd
              border border-gray-300 rounded" autocomplete="off" spellcheck="false" data-gramm="false"
              autocapitalize="off" />
            ～
            <input type="date" id="dateTo" v-model="dateTo" class="p-2 w-smd
              border border-gray-300 rounded" autocomplete="off" spellcheck="false" data-gramm="false"
              autocapitalize="off" />
          </div>

          <!-- Favorites Input Field -->
          <div id="favorites" class="mb-4">
            <label for="favorites" class="block text-sm font-medium mb-1">Favorites</label>
            <input type="number" id="favorite-min" v-model="favoriteMin" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: -inf" autocomplete="off" spellcheck="false"
              data-gramm="false" autocapitalize="off" />
            ～
            <input type="number" id="favorite-max" v-model="favoriteMax" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: +inf" autocomplete="off" spellcheck="false"
              data-gramm="false" autocapitalize="off" />
          </div>

          <!-- Retweets Input Field -->
          <div id="retweets" class="mb-4">
            <label for="retweets" class="block text-sm font-medium mb-1">Retweets</label>
            <input type="number" id="retweet-min" v-model="retweetMin" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: -inf" autocomplete="off" spellcheck="false"
              data-gramm="false" autocapitalize="off" />
            ～
            <input type="number" id="retweet-max" v-model="retweetMax" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: +inf" autocomplete="off" spellcheck="false"
              data-gramm="false" autocapitalize="off" />
          </div>

          <!-- Replies Input Field -->
          <div id="replies" class="mb-4">
            <label for="replies" class="block text-sm font-medium mb-1">Replies</label>
            <input type="number" id="reply-min" v-model="replyMin" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: -inf" autocomplete="off" spellcheck="false"
              data-gramm="false" autocapitalize="off" />
            ～
            <input type="number" id="reply-max" v-model="replyMax" class="p-2 w-smd
              border border-gray-300 rounded" placeholder="default: +inf" autocomplete="off" spellcheck="false"
              data-gramm="false" autocapitalize="off" />
          </div>

          <div class="button-container my-4">
            <button id="generateBtn" @click="generateCommand"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Generate Search Command
            </button>
          </div>
        </div>

        <div class="search-result mx-auto my-4 p-4">
          <h2 class="subtitle mb-2">Search Command Result</h2>
          <textarea id="result" v-model="result" class="w-full h-32 p-2 border border-gray-300 rounded"
            autocomplete="off" spellcheck="false" data-gramm="false" autocapitalize="off"></textarea>
          
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
import { ref } from 'vue';

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

    const generateCommand = () => {
      const commandParts = [];

      // Account ID
      const acc = typeof accountId.value === 'string' ? accountId.value.trim() : '';
      if (acc) commandParts.push(`from:${acc}`);

      // Keywords
      const kw = typeof keywords.value === 'string' ? keywords.value.trim() : '';
      if (kw) commandParts.push(`"${kw}"`);

      // Date Range
      if (dateFrom.value) commandParts.push(`since:${dateFrom.value}`);
      if (dateTo.value) commandParts.push(`until:${dateTo.value}`);

      // Favorites
      if (favoriteMin.value !== '') commandParts.push(`min_faves:${favoriteMin.value}`);
      if (favoriteMax.value !== '') commandParts.push(`max_faves:${favoriteMax.value}`);

      // Retweets
      if (retweetMin.value !== '') commandParts.push(`min_retweets:${retweetMin.value}`);
      if (retweetMax.value !== '') commandParts.push(`max_retweets:${retweetMax.value}`);

      // Replies
      if (replyMin.value !== '') commandParts.push(`min_replies:${replyMin.value}`);
      if (replyMax.value !== '') commandParts.push(`max_replies:${replyMax.value}`);

      result.value = commandParts.join(' ');
    };

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
    };
  },
};
</script>