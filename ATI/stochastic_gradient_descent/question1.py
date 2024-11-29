import numpy as np

weights = np.array([0.2, -0.4, 0.1])
lr = 0.02
x = np.array([50, 180, 3])
y_actual = 1


def sigmoid(z):
    return 1 / (1 + np.exp(-z))


z = np.dot(weights, x)
y_pred = sigmoid(z)

grad = x * (y_pred - y_actual)

w_update = weights - lr * grad

print(w_update)
