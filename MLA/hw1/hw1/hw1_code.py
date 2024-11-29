# a
from sklearn.model_selection import train_test_split 
from sklearn.feature_extraction.text import TfidfVectorizer 
import numpy as np

def load_data(real_file='clean_real.txt', fake_file='clean_fake.txt'):
    # import data
    with open(real_file, 'r') as f:
        real_headlines = f.readlines()
    with open(fake_file, 'r') as f:
        fake_headlines = f.readlines()

    X = real_headlines + fake_headlines
    y = [1] * len(real_headlines) + [0] * len(fake_headlines)

    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(X)

    # split
    X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.30, random_state=42)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.50, random_state=42)

    return X_train, X_val, X_test, y_train, y_val, y_test, vectorizer

# b
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt

def select_model(X_train, X_val, X_test, y_train, y_val,y_test):
    max_depths = [5, 10, 15, 20, 25]
    criteria = ['entropy', 'gini', 'log_loss']
    
    best_accuracy = 0
    best_params = {}
    
    for criterion in criteria:
        accuracies = []
        for max_depth in max_depths:
            clf = DecisionTreeClassifier(max_depth=max_depth, criterion=criterion, random_state=42)
            clf.fit(X_train, y_train)
            accuracy = clf.score(X_val, y_val)
            accuracies.append(accuracy)
            print(f"Max Depth: {max_depth}, Criterion: {criterion}, Accuracy: {accuracy}")
            
            if accuracy > best_accuracy:
                best_accuracy = accuracy
                best_params = {'max_depth': max_depth, 'criterion': criterion}
        
        plt.plot(max_depths, accuracies, label=criterion)
    
    plt.xlabel('Max Depth')
    plt.ylabel('Validation Accuracy')
    plt.legend()
    plt.title('Validation Accuracy vs Max Depth')
    plt.savefig('validation_accuracy_plot.png')
    plt.close()
    
    print(f"Best parameters: {best_params}")
    print(f"Best validation accuracy: {best_accuracy}")
    
    best_clf = DecisionTreeClassifier(**best_params, random_state=42)
    best_clf.fit(X_train, y_train)
    test_accuracy = best_clf.score(X_test, y_test)
    print(f"Test accuracy with best model: {test_accuracy}")
    
    return best_clf

# c
from sklearn.tree import plot_tree 
import matplotlib.pyplot as plt

def visualize_tree(best_clf, feature_names):
    plt.figure(figsize=(20, 10))
    plot_tree(best_clf, max_depth=2, filled=True, feature_names=feature_names, class_names=['Fake', 'Real'], rounded=True)
    plt.title('First Two Layers of the Decision Tree')
    plt.savefig('decision_tree_visualization.png')
    plt.show()

# d
import numpy as np
from sklearn.feature_selection import mutual_info_classif
from scipy.sparse import issparse

def compute_information_gain(X, y, feature):
    if X.ndim == 1:
        X = X.reshape(-1, 1)
    elif issparse(X):
        # convert x to compressed sparse column
        X = X.tocsc()
    
    # Use mutual_info_classif to compute information gain
    ig = mutual_info_classif(X[:, feature], y, discrete_features=True)
    return ig[0]  

def report_information_gains(X_train, y_train, vectorizer, clf, top_features=5):
    feature_names = vectorizer.get_feature_names_out()
    
    # Get feature importances from the trained classifier
    importances = clf.feature_importances_
    
    # Sort features by importance
    sorted_idx = np.argsort(importances)
    top_feature_indices = sorted_idx[-top_features:][::-1]
    
    print("Top features and their information gains:")
    for idx in top_feature_indices:
        feature_name = feature_names[idx]
        ig = compute_information_gain(X_train, y_train, idx)
        print(f"Feature: {feature_name}, Information Gain: {ig:.4f}")
    
    print("\nInformation gains for some other keywords:")
    additional_keywords = ['trump', 'election', 'breaking', 'news', 'report']
    for keyword in additional_keywords:
        if keyword in vectorizer.vocabulary_:
            idx = vectorizer.vocabulary_[keyword]
            ig = compute_information_gain(X_train, y_train, idx)
            print(f"Feature: {keyword}, Information Gain: {ig:.4f}")
        else:
            print(f"Feature: {keyword} not found in vocabulary")

# code test
X_train, X_val, X_test, y_train, y_val, y_test, vectorizer = load_data()
best_clf = select_model(X_train, X_val, X_test, y_train, y_val, y_test)
visualize_tree(best_clf, vectorizer.get_feature_names_out())
report_information_gains(X_train, y_train, vectorizer, best_clf)