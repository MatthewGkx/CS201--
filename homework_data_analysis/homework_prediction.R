
raw_data <- read.csv("~/house_lianjia_communities_raw_data_prediction.csv")
test_data <- read.csv("~/test_data.csv")
train_ds0 <- raw_data[,c(4,7,8,10,12,13)]
train_ds <- na.omit(train_ds0) 
#attach(train_ds)


plot(train_ds)
#attach(train_ds)

cor(train_ds)
cor.test(y,x1)
cor.test(y,x2)
cor.test(y,x3)
cor.test(y,x4)
cor.test(y,x5)

reg1 = lm( y~x1+x2+x3+x4+x5)
summary(reg1)
# P值都是＜0.05的

bb=coefficients(reg1)
b0=bb[[1]]
b1=bb[[2]]
b2=bb[[3]]
b3=bb[[4]]
b4=bb[[5]]
b5=bb[[6]]

attach(test_data)

yy2 = b0 + b1*x1 + b2*x2 + b3*x3 + b4*x4 + b5*x5
# house price pridiction : 41793 39023

