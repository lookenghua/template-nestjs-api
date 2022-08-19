FROM node:14 AS development
ENV NODE_ENV build
RUN npm config set registry https://registry.npmmirror.com
RUN chown -Rh $user:$user /home/node

USER $user
ENV port 80
WORKDIR /home/node
COPY . /home/node
RUN yarn

RUN npm run build
EXPOSE 80
CMD ["npm", "run","start"]
