
interface NodeModule {
    hot: {
        accept(dependencies: string[], callback: (updatedDependencies) => void): void;
        accept(dependency: string, callback: () => void): void;
        accept(errHandler: (err: Error) => void): void
    };
}
