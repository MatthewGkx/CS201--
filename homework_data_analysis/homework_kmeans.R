
install.packages("fpc")
library(fpc) 
data_lianjia<-read.csv("~/house_lianjia_communities1.csv")


min.max.norm <- function(x){
  (x-min(x))/(max(x)-min(x))
}
raw.data <- data_lianjia[,12:13]
norm.data <- data.frame(lat = min.max.norm(raw.data[,1]),
                        
                        lng = min.max.norm(raw.data[,2]))
norm.data


K <- 2:8
round <- 1

# 计算轮廓系数：Silhouette Coefficient
rst <- sapply(K, function(i) {
  print(paste("K=", i))
  mean(sapply(1:round,function(r) {
    print(paste("Round", r))
    result <- kmeans(norm.data, i)
    stats <- cluster.stats(dist(norm.data), result$cluster)
    stats$avg.silwidth
  }))
})
plot(K,rst,type='l',main='Silhouette Coefficient vs K', ylab='Silhouette Coefficient')
# 降纬度观察
old.par <- par(mfrow = c(1,2))

k = 3 # 根据上面的评估 k=5最优
clu <- kmeans(norm.data,k)
mds = cmdscale(dist(norm.data,method="euclidean"))
plot(mds, col=clu$cluster, main='kmeans - k=3', pch = 19)
plot(mds, col=iris$Species, main='Original clusters', pch = 19)
 par(old.par)
