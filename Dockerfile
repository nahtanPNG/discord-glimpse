FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY src/ ./src/

RUN addgroup -g 1001 -S nodejs && \
    adduser -S discordbot -u 1001

RUN chown -R discordbot:nodejs /app

USER discordbot

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/user/457725135940616202', (res) => { process.exit(res.statusCode === 400 ? 0 : 1) })"

CMD ["npm", "run", "start"]